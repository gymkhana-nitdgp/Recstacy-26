import * as THREE from 'three';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { generateCardTexture } from '../utils/generateCardTexture';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function SafeLanyard({ position, name, role, email, imageUrl }: any) {
  const { gl } = useThree();
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const card = useRef<any>(null);
  
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const { nodes, materials } = useGLTF('/assets/3d/card.glb') as any;

  // --- TEXTURE HANDLING ---
  const createFallbackTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 800);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const [texture, setTexture] = useState<THREE.CanvasTexture>(createFallbackTexture);
  
  useEffect(() => {
    let isMounted = true;
    generateCardTexture(imageUrl, name, role, email, gl)
      .then((tex) => {
        if (isMounted) setTexture(tex);
        else tex.dispose();
      })
      .catch((err) => console.error(err));
    return () => { isMounted = false; };
  }, [imageUrl, name, role, email, gl]);

  // --- PHYSICS ---
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.05]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.05]);
  useSphericalJoint(j2, card, [[0, 0, 0], [0, 0.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
        fixed.current.setTranslation({ x: position[0], y: position[1], z: position[2] });
        [j1, j2].forEach((ref) => {
            if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
            ref.current.lerped.lerp(ref.current.translation(), Math.min(delta * 20, 1));
        });

        const cardPos = card.current.translation();
        const clipPos = new THREE.Vector3(cardPos.x, cardPos.y + 0.5, cardPos.z);

        curve.points[0].copy(clipPos);
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        
        if (band.current) {
            band.current.geometry.setPoints(curve.getPoints(32));
        }

        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  const jointProps = { type: 'kinematic' as const, canSleep: false, colliders: false, angularDamping: 8, linearDamping: 8 } as any;
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false, angularDamping: 8, linearDamping: 8 } as any;

  return (
    <>
      <group>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.05, 0, 0]} ref={j1} {...jointProps}><BallCollider args={[0.05]} /></RigidBody>
        <RigidBody position={[0.1, 0, 0]} ref={j2} {...jointProps}><BallCollider args={[0.05]} /></RigidBody>
        
        <RigidBody position={[0.15, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.9, 0.9, 0.01]} />
          <group
            scale={[1.8, 1.2, 1.2]} 
            position={[0, -0.8, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e: any) => { e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); }}
          >
            {/* ID CARD */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial 
                map={texture} 
                map-flipY={false} // Ensures text is upright
                clearcoat={0.5} 
                clearcoatRoughness={0.1} 
                roughness={0.8} 
                metalness={0.1} 
              />
            </mesh>
            
            {/* FORCE BLACK CLIPS */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal}>
                <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry} material={materials.metal}>
                <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      
      {/* FORCE BLACK STRING */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
            color="#111111" 
            depthTest={false} 
            resolution={[1000, 1000]} 
            lineWidth={0.5} 
        />
      </mesh>
    </>
  );
}