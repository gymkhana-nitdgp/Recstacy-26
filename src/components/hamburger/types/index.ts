import type { Ref } from "react";
import type { GLTF } from "three-stdlib";
import type { SetStateAction } from "react";
import * as THREE from "three";
export interface ModalFace {
  modalRef: Ref<HTMLDivElement>;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

export interface FallingStarsProps {
  count?: number;
}

export interface HandButtonProps {
  position: [number, number, number];
  path: string;
  id: string;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  label: string;
  setIsOpen: (val: SetStateAction<boolean>) => void;
}

export type GLTFResult = GLTF & {
  nodes: {
    "tripo_node_f71c521f-7340-426f-af00-1ee163085bfa": THREE.Mesh;
  };
  materials: {
    "tripo_material_f71c521f-7340-426f-af00-1ee163085bfa": THREE.MeshStandardMaterial;
  };
};

export interface Text3D {
  hovered: string;
  id: string;
  position: [number, number, number];
  path: string;
  label: string;
}
