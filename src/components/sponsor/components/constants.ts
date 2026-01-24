
export interface Sponsor {
  name: string;
  src: string;
  tier?: 'strategic' | 'standard';
}

export const MOBILE_ORDER: Sponsor[] = [
  // Row 1
  { name: "Adobe", src: "/sponsors/adobe.png" },
  { name: "Microsoft", src: "/sponsors/microsoft.png" },
  { name: "IBM", src: "/sponsors/ibm.png" },
  { name: "Nvidia", src: "/sponsors/nvidia.png" },
  // Row 2
  { name: "HP", src: "/sponsors/hp.png" },
  { name: "Flipkart", src: "/sponsors/flipkart.png" },
  { name: "SBI", src: "/sponsors/sbi.png" },
  { name: "Airtel", src: "/sponsors/airtel.png" },
  { name: "OLA", src: "/sponsors/ola.png" },
  // Row 3
  { name: "Indian Oil", src: "/sponsors/indianoil.png" },
  { name: "Nestle", src: "/sponsors/nestle.png" },
  { name: "Aircel", src: "/sponsors/aircel.png" },
  { name: "HP Petrol", src: "/sponsors/hp_petrol.png" },
  { name: "Dominos", src: "/sponsors/dominos.png" },
  // Row 4
  { name: "Red FM", src: "/sponsors/redfm.png" },
  { name: "Youth Express", src: "/sponsors/youthexpress.png" },
  { name: "EY", src: "/sponsors/ey.png" },
  // Row 5
  { name: "Manaksia", src: "/sponsors/manaksia.png" },
  { name: "Godrej", src: "/sponsors/godrej.png" },
  { name: "Coca Cola", src: "/sponsors/cocacola.png" },
  // Row 6
  { name: "ICICI", src: "/sponsors/icici.png" },
  { name: "Ingram", src: "/sponsors/ingram.png" },
  { name: "Indigo", src: "/sponsors/indigo.png" },
  // Row 7
  { name: "Red Bull", src: "/sponsors/redbull.png" },
  { name: "Avaya", src: "/sponsors/avaya.png" },
  { name: "Erudite", src: "/sponsors/erudite.png" },
];

export const LAST_ON_DESKTOP = ["Manaksia", "EY", "ICICI", "Avaya", "Aircel"];