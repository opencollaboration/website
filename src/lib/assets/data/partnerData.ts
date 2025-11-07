interface PartnerItem {
  name: string;
  logo: string;
  description: string;
  hasImage: boolean;
}

export const partners: PartnerItem[] = [
  {
    name: "Ziax",
    logo: "resources/partnericons/ziax_logo.svg",
    description: "Leading infrastructure and development partner",
    hasImage: false,
  },
  {
    name: "Waypoint Studios",
    logo: "resources/partnericons/waypoint_studios.jpg",
    description: "Creative studio supporting FOSS initiatives",
    hasImage: false,
  },
  {
    name: "Mineville",
    logo: "resources/partnericons/mineville_light.png",
    description: "Community-focused partner in Minecraft ecosystem",
    hasImage: false,
  },
];
