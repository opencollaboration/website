export interface Project {
  name: string;
  description: string;
  logo: string;
  link: string;
  hasImage: boolean;
}

export const adoptedProjects: Project[] = [
  {
    name: "Geyser",
    description: "Bridges Minecraft Java and Bedrock editions",
    logo: "/resources/projects/geysermc_icon.png",
    link: "https://geysermc.org",
    hasImage: false,
  },
  {
    name: "Cloudburst",
    description: "High-performance Minecraft Bedrock server",
    logo: "/resources/projects/cloudburst_icon.png",
    link: "#",
    hasImage: false,
  },
];
