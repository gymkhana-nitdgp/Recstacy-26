import React, { useMemo } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import ProfileCard from './ProfileCard';

interface HangingCardProps {
  position: [number, number, number];
  name: string;
  role: string;
  instaId: string;
  imageUrl: string;
}

export default function HangingCard({ position, name, role, instaId, imageUrl }: HangingCardProps) {
  // @ts-ignore
  const { nodes } = useGLTF('/assets/3d/card.glb');

  const cardMesh = nodes.card || Object.values(nodes).find((n: any) => n.isMesh);
  const clipMesh = nodes.clip || Object.values(nodes).find((n: any) => n.isMesh && n.name.includes('clip'));
  const clampMesh = nodes.clamp || Object.values(nodes).find((n: any) => n.isMesh && n.name.includes('clamp'));

  const groupRef = React.useRef<THREE.Group>(null);
  const randomPhase = useMemo(() => Math.random() * 100, []);
  
  // Logic to parse instagram handle if passed via props
  const handle = instaId.includes('@') ? instaId.split('@')[0] : instaId;

  useFrame((state) => {
    if (groupRef.current) {
      // REDUCED OSCILLATION: Very slow and subtle
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + randomPhase) * 0.02;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + randomPhase) * 0.01;
    }
  });

  if (!cardMesh) return null;

  return (
    <group ref={groupRef} position={position}>
      
      {/* 1. STRING */}
      <mesh position={[0, 7.5, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 15, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* 2. CARD GROUP */}
      <group position={[0, 0, 0]} scale={0.65}>
        
        {/* Body - WIDENED to 2.8 to fit very large text/content */}
<mesh geometry={(cardMesh as THREE.Mesh).geometry} scale={[2.8, 0.6, 1.15]}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Clips */}
        <group position={[0, 0.6, 0]}>
{clipMesh && <mesh geometry={(clipMesh as THREE.Mesh).geometry}><meshStandardMaterial color="#111" /></mesh>}
{clampMesh && <mesh geometry={(clampMesh as THREE.Mesh).geometry}><meshStandardMaterial color="#111" /></mesh>}
        </group>

        {/* HTML Content */}
        <Html
          transform
          wrapperClass="html-card"
          // INCREASED Z OFFSET to 0.08 to prevent image flickering
          position={[0, 0, 0.08]} 
          scale={0.15} 
          style={{ pointerEvents: 'none' }}
        >
          {/* WIDENED CONTAINER to 680px */}
          <div style={{ width: '600px', height: '300px', pointerEvents: 'auto' }}>
            <ProfileCard
              name={name}
              title={role}
              handle={handle}
              avatarUrl={imageUrl}
              enableTilt={false}
              className="w-full h-full object-cover"
            />
          </div>
        </Html>
      </group>
    </group>
  );
}