import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import Background from "./Background";
import type { SetStateAction } from "react"; 

export default function RenderableModel({ 
  size, 
  setIsOpen, 
  handleNavClick 
}: { 
  size: number; 
  setIsOpen: (val: SetStateAction<boolean>)=>void;
  handleNavClick: (e: React.MouseEvent<Element, MouseEvent>, path: string, isScrollLink?: boolean) => void;
}) {
  return (
      <Canvas>
        <OrbitControls enablePan={false} />
        <ambientLight color={"#F6E985"} intensity={3} />
        <Background>
          <Model setIsOpen={setIsOpen} scale={size} props={{}} handleNavClick={handleNavClick} />
        </Background>
      </Canvas>
  );
}
