
export interface Sponsor {
  name: string;
  src: string;
  tier?: 'strategic' | 'standard';
}

export const MOBILE_ORDER: Sponsor[] = [
  // Row 1
  { name: "Arihants", src: "/sponsors/arihants.png" },
  { name: "Evrest", src: "/sponsors/evrest.png" },
  { name: "Adobe", src: "/sponsors/adobe.png" },
  { name: "Microsoft", src: "/sponsors/microsoft.png" },
  // Row 2
  { name: "IBM", src: "/sponsors/ibm.png" },
  { name: "Nvidia", src: "/sponsors/nvidia.png" },
  { name: "HP", src: "/sponsors/hp.png" },
  { name: "Flipkart", src: "/sponsors/flipkart.png" },
  { name: "SBI", src: "/sponsors/sbi.png" },
  // Row 3
  { name: "Airtel", src: "/sponsors/airtel.png" },
  { name: "OLA", src: "/sponsors/ola.png" },
  { name: "Indian Oil", src: "/sponsors/indianoil.png" },
  { name: "Nestle", src: "/sponsors/nestle.png" },
  { name: "Aircel", src: "/sponsors/aircel.png" },
  // Row 4
  { name: "HP Petrol", src: "/sponsors/hp_petrol.png" },
  { name: "Dominos", src: "/sponsors/dominos.png" },
  { name: "Red FM", src: "/sponsors/redfm.png" },
  { name: "Youth Express", src: "/sponsors/youthexpress.png" },
  { name: "EY", src: "/sponsors/ey.png" },
  // Row 5
  { name: "Manaksia", src: "/sponsors/manaksia.png" },
  { name: "Godrej", src: "/sponsors/godrej.png" },
  { name: "Coca Cola", src: "/sponsors/cocacola.png" },
  { name: "ICICI", src: "/sponsors/icici.png" },
  { name: "Ingram", src: "/sponsors/ingram.png" },
  // Row 6
  { name: "Indigo", src: "/sponsors/indigo.png" },
  { name: "Red Bull", src: "/sponsors/redbull.png" },
  { name: "Avaya", src: "/sponsors/avaya.png" },
  { name: "Erudite", src: "/sponsors/erudite.png" },
  // Row 7
];

export const LAST_ON_DESKTOP = ["Manaksia", "EY", "ICICI", "Avaya", "Aircel"];