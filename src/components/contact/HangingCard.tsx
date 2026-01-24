import { Html } from "@react-three/drei";
import Card from "./Card";
import type { CardInter } from "../../types";

export default function HangingCard({
  position,
  attributes,
}: {
  attributes: CardInter;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <Html transform wrapperClass="html-card" position={[0, 0, 0]} scale={0.25}>
        <Card {...attributes} />
      </Html>
    </group>
  );
}
