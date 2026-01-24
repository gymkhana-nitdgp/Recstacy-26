import { useRef, type ReactNode, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { FallingStarsProps } from "../types";


const generateStarPositions = (count: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20; // X
    positions[i * 3 + 1] = Math.random() * 20 - 10; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z
  }
  return positions;
};

const FallingStars = ({ count = 300 }: FallingStarsProps) => {
  const meshRef = useRef<THREE.Points>(null!);

  const [positions] = useState<Float32Array>(() => generateStarPositions(count));

  useFrame((_: unknown, delta) => {
    const attr = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = attr.getY(i);
      y -= delta * 2; // Falling speed

      if (y < -10) y = 10; // Reset to top

      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#CEC04E" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Background = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FallingStars />
      <Sparkles count={100} scale={4} size={5} speed={0.8} opacity={0.5} color="orange" />
      {children}
    </>
  );
};

export default Background;
