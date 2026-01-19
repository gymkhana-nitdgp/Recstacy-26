import { Suspense } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Environment, Lightformer, Preload, Html } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import RiggedCard from './RiggedCard';

extend({ MeshLineGeometry, MeshLineMaterial });

interface ContactSceneProps {
  people: Array<{
    id: number;
    image: string;
    position: [number, number, number];
  }>;
}

// Simple Loading Spinner for the 3D part
function Loader() {
  return (
    <Html center>
      <div className="text-white font-mono text-sm animate-pulse">
        LOADING ASSETS...
      </div>
    </Html>
  );
}

export default function ContactScene({ people }: ContactSceneProps) {
  return (
    <div className="w-full h-full relative min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 25 }}
        gl={{ alpha: true }}
        className="absolute inset-0 w-full h-full" // FORCE FULL SIZE
      >
        <ambientLight intensity={2} />
        
        {/* Suspense is REQUIRED for async textures/models */}
        <Suspense fallback={<Loader />}>
          <Physics gravity={[0, -40, 0]}>
            {people.map((person) => (
              <RiggedCard 
                key={person.id} 
                position={person.position} 
                imageUrl={person.image} 
              />
            ))}
          </Physics>
          
          <Environment blur={0.75}>
              <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          </Environment>
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}