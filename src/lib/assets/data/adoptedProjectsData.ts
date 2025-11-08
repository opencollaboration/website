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
    description: "Bridges Minecraft Java and Bedrock: Bringing true cross-play to servers.",
    logo: "/resources/projects/geysermc_icon.png",
    link: "https://geysermc.org",
    hasImage: false,
  },
  {
    name: "Cloudburst",
    description: "Maintains core libraries to power Minecraft: Bedrock Edition servers.",
    logo: "/resources/projects/cloudburst_icon.png",
    link: "https://cloudburstmc.org/",
    hasImage: false,
  },
];
