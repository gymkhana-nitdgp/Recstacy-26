import { useState, type JSX, type SetStateAction } from "react";
import { useGLTF, Text3D } from "@react-three/drei";
import type { HandButtonProps, GLTFResult } from "../types";
import { TextProps } from "../util";

const HandButton = ({
  position,
  path,
  id,
  isHovered,
  onHover,
  label,
  setIsOpen,
  handleNavClick,
}: HandButtonProps) => {
  const handleClick = () => {
    setIsOpen(false);
    // Create a synthetic mouse event for handleNavClick
    const syntheticEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.MouseEvent<Element, MouseEvent>;

    // Determine if this is a scroll link (sponsors might be, but based on NavMenus all are false)
    const isScrollLink = false;
    handleNavClick(syntheticEvent, path, isScrollLink);
  };

  return (
    <mesh
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "auto";
      }}
    >
      <Text3D
        font="/aesthetic_violet_regular.json"
        size={0.04}
        height={0.01}
        letterSpacing={0.0002}
      >
        {label}
        <meshStandardMaterial color={isHovered ? "#eee" : "#ffffff"} />
      </Text3D>
    </mesh>
  );
};

export default function Model({
  props,
  setIsOpen,
  scale,
  handleNavClick,
}: {
  props: JSX.IntrinsicElements["group"];
  setIsOpen: (val: SetStateAction<boolean>) => void;
  scale: number;
  handleNavClick: (
    e: React.MouseEvent<Element, MouseEvent>,
    path: string,
    isScrollLink?: boolean,
  ) => void;
}) {
  const { nodes, materials } = useGLTF("/models/model.glb") as unknown as GLTFResult;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <group {...props} scale={scale} dispose={null}>
      <mesh
        geometry={nodes["tripo_node_f71c521f-7340-426f-af00-1ee163085bfa"].geometry}
        material={materials["tripo_material_f71c521f-7340-426f-af00-1ee163085bfa"]}
        position={[0, -0.0, 0]}
        rotation={[0, -33, 0]}
      />
      {TextProps.map((ele, idx) => (
        <HandButton
          setIsOpen={setIsOpen}
          handleNavClick={handleNavClick}
          key={idx}
          id={ele.id}
          position={ele.position}
          path={ele.path}
          label={ele.label}
          onHover={setHovered}
          isHovered={hovered === ele.hovered}
        />
      ))}
    </group>
  );
}

useGLTF.preload("/models/model.glb");
