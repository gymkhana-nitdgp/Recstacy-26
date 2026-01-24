import type { Text3D } from "../types";

export const TextProps: Text3D[] = [
  {
    hovered: "upper-left",
    id: "upper-left",
    position: [-0.25, 0.35, 0.03],
    path: "/",
    label: "Home"
  },
  {
    hovered: "upper-right",
    id: "upper-right",
    position: [0.12, 0.35, 0.03],
    path: "/events",
    label: "Events"
  },
  {
    hovered: "mid-left",
    id: "mid-left",
    position: [-0.38, 0.08, 0.1],
    path: "/sponsors",
    label: "Sponsors"
  },
  {
    hovered: "mid-right",
    id: "mid-right",
    position: [0.16, 0.08, 0.1],
    path: "/contact",
    label: "Contact"
  },
];
