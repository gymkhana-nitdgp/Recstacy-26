import * as THREE from 'three';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { useGLTF, Html, useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import ProfileCard from './ProfileCard';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function SafeLanyard({ position, name, role, email, imageUrl }: any) {
  const { width: viewportWidth } = useThree().viewport;
  const isMobile = viewportWidth < 8;

  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const card = useRef<any>(null);
  
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  // 1. ASSETS
  const { nodes } = useGLTF('/assets/3d/card.glb') as any;
  const backTexture = useTexture('/assets/tag_texture.png');
  backTexture.wrapS = THREE.RepeatWrapping;
  backTexture.wrapT = THREE.RepeatWrapping;

  // 2. MESH FINDER
  const cardMesh = nodes.card || Object.values(nodes).find((n: any) => n.isMesh);
  const clipMesh = nodes.clip || Object.values(nodes).find((n: any) => n.isMesh && n.name.includes('clip'));
  const clampMesh = nodes.clamp || Object.values(nodes).find((n: any) => n.isMesh && n.name.includes('clamp'));

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
        // Adjust clip offset so rope looks attached to top of card
        const clipPos = new THREE.Vector3(cardPos.x, cardPos.y + 0.4, cardPos.z);

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

  // PHYSICS SETTINGS: Increased damping to make it feel like a heavy ID card
  const jointProps = { type: 'kinematic' as const, canSleep: false, colliders: false, angularDamping: 2, linearDamping: 2 } as any;
  const segmentProps = { type: 'dynamic' as const, canSleep: false, colliders: false, angularDamping: 4, linearDamping: 2, mass: 2 } as any;

  if (!cardMesh) return null;

  // CARD DIMENSIONS (Robust size for physics engine)
  const CARD_WIDTH = 1.8; 
  const CARD_HEIGHT = 1.1; 
  const HTML_SCALE = isMobile ? 0.22 : 0.25; // Smaller on mobile

  return (
    <>
      <group>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.05, 0, 0]} ref={j1} {...jointProps}><BallCollider args={[0.05]} /></RigidBody>
        <RigidBody position={[0.1, 0, 0]} ref={j2} {...jointProps}><BallCollider args={[0.05]} /></RigidBody>
        
        <RigidBody position={[0.15, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          {/* COLLIDER: Matches the visual card size 
             args = [halfWidth, halfHeight, halfDepth] 
          */}
          <CuboidCollider args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, 0.05]} />
          
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e: any) => { 
                // Important: Stop propagation so we don't click through the card
                e.stopPropagation();
                e.target.setPointerCapture(e.pointerId); 
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); 
            }}
          >
            {/* 1. INVISIBLE HITBOX (Critical for "Responsiveness") */}
            {/* This ensures your mouse/finger hits this plane first, triggering the drag */}
            <mesh visible={false}>
                <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* 2. CARD MESH (Backside) */}
            <mesh 
              geometry={cardMesh.geometry} 
              scale={[1.15, 0.6, 1.15]} // Adjusted to match the HTML card shape
            >
                <meshStandardMaterial 
                    map={backTexture} 
                    map-flipY={false}
                    color="white"
                    roughness={0.4}
                />
            </mesh>

            {/* 3. HTML FRONT */}
            <Html 
                transform 
                wrapperClass="html-card"
                position={[0, 0, 0.06]} // Slightly in front
                scale={HTML_SCALE}
                style={{ pointerEvents: 'none' }} // Disable pointer events on wrapper
            >
                {/* Fixed Pixel Size: 
                   300px * 0.25 scale ~= 75 units in screen space. 
                   This is a crisp, compact size.
                */}
                <div style={{ width: '300px', height: '180px' }}>
                    <ProfileCard 
                        name={name}
                        title={role}
                        handle={email.split('@')[0]}
                        avatarUrl={imageUrl}
                        enableTilt={false}
                        // Re-enable pointer events ONLY for the button
                        onContactClick={() => console.log('clicked')}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Html>
            
            {/* 4. CLIPS */}
            <group position={[0, 0.6, 0]}>
                {clipMesh && (
                    <mesh geometry={clipMesh.geometry}>
                        <meshStandardMaterial color="#111111" metalness={0.8} />
                    </mesh>
                )}
                {clampMesh && (
                    <mesh geometry={clampMesh.geometry}>
                        <meshStandardMaterial color="#111111" metalness={0.8} />
                    </mesh>
                )}
            </group>

          </group>
        </RigidBody>
      </group>
      
      {/* STRING */}
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