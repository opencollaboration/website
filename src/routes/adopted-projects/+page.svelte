<script lang="ts">
  import ProjectSection from "$lib/components/adopted-projects/ProjectSection.svelte";

  type ProjectItem = {
    icon?: string;
    title: string;
    description: string;
    githubUrl: string;
    modrinthUrl?: string;
    downloadUrl?: string;
    wikiUrl?: string;
    stars: string;
    commits: string;
    cardColor?: string;
  };

  type ProjectSectionData = {
    logo: string;
    title: string;
    description: string;
    projects: ProjectItem[];
    githubUrl: string;
    websiteUrl?: string;
    twitterUrl?: string;
    modrinthUrl?: string;
  };

  const geysermc: ProjectItem[] = [
    {
      title: "Geyser",
      description:
        "Geyser is a program that allows Minecraft: Bedrock Edition clients to join Minecraft: Java Edition servers, allowing for true crossplay between both editions of the game.",
      githubUrl: "https://github.com/GeyserMC/Geyser",
      modrinthUrl: "https://modrinth.com/mod/geyser",
      stars: "5.4k+",
      commits: "4.5k+",
      cardColor: "linear-gradient(105deg,rgba(182, 229, 245, 1) 0%, rgba(115, 203, 236, 1) 50%, rgba(79, 160, 244, 1) 100%)",
    },
    {
      title: "Floodgate",
      description:
        "Floodgate is a hybrid mode plugin to allow for connections from Geyser to join online mode servers.",
      githubUrl: "https://github.com/GeyserMC/Floodgate",
      modrinthUrl: "https://modrinth.com/mod/floodgate",
      stars: "600+",
      commits: "400+",
      cardColor: "linear-gradient(105deg,rgba(90, 175, 238, 1) 0%, rgba(69, 159, 229, 1) 50%, rgba(106, 116, 251, 1) 100%)",
    },
    {
      title: "MCProtocolLib",
      description:
        "MCProtocolLib is a simple library for communicating with Minecraft clients and servers.",
      githubUrl: "https://github.com/GeyserMC/MCProtocolLib",
      stars: "850+",
      commits: "1.5k+",
      cardColor: "linear-gradient(105deg,rgba(229, 175, 126, 1) 0%, rgba(156, 92, 81, 1) 50%, rgba(123, 59, 49, 1) 100%)",
    },
    {
      title: "Rainbow",
      description:
        "A Minecraft mod to generate Geyser mappings and Bedrock resourcepacks for use with Geyser's custom content APIs.",
      githubUrl: "https://github.com/GeyserMC/Rainbow",
      modrinthUrl: "https://modrinth.com/mod/rainbow-mod",
      stars: "70+",
      commits: "240+",
      cardColor: "linear-gradient(105deg,rgba(222, 91, 91, 1) 0%, rgba(221, 230, 103, 1) 25%, rgba(101, 230, 155, 1) 50%, rgba(96, 167, 224, 1) 75%, rgba(235, 110, 240, 1) 100%)",
    },
    {
      title: "Thunder",
      description:
        "Thunder is a pack converting tool from Minecraft: Java Edition to Minecraft: Bedrock Edition.",
      githubUrl: "https://github.com/GeyserMC/PackConverter",
      downloadUrl: "https://geysermc.org/download?project=other-projects&thunder=expanded",
      stars: "150+",
      commits: "240+",
      cardColor: "linear-gradient(105deg,rgba(243, 245, 182, 1) 0%, rgba(234, 236, 115, 1) 50%, rgba(244, 236, 79, 1) 100%)",
    },
    {
      title: "Geyser Global API",
      description:
        "The API powering Bedrock account lookups and Floodgate account linking.",
      githubUrl: "https://github.com/GeyserMC/global_api",
      wikiUrl: "https://geysermc.org/wiki/api/global",
      stars: "10+",
      commits: "150+",
      cardColor: "linear-gradient(105deg,rgba(165, 215, 73, 1) 0%, rgba(100, 152, 76, 1) 50%, rgba(55, 111, 84, 1) 100%)",
    }
  ];

  const cloudburstmc: ProjectItem[] = [
    {
      title: "Protocol",
      description:
        "A protocol library for Minecraft that supports multiple versions.",
      githubUrl: "https://github.com/CloudburstMC/Protocol",
      stars: "350+",
      commits: "850+",
      cardColor: "#dea600",
    },
    {
      title: "ProxyPass",
      description:
        "Proxy pass allows developers to MITM a vanilla client and server without modifying them.",
      githubUrl: "https://github.com/CloudburstMC/ProxyPass",
      stars: "150+",
      commits: "150+",
      cardColor: "#0193dd",
    },
    {
      title: "Nukkit",
      description:
        "Nukkit is a server software for Minecraft: Bedrock Edition.",
      githubUrl: "https://github.com/CloudburstMC/Nukkit",
      stars: "1.3k+",
      commits: "4.0k+",
      cardColor: "#0193dd",
    },
  ];

  const incubating: ProjectItem[] = [
    {
      icon: "/resources/projects/boar_icon.png",
      title: "Boar",
      description:
        "FOSS Minecraft: Bedrock Edition predictive anticheat",
      githubUrl: "https://github.com/opencollab-incubator/Boar",
      modrinthUrl: "https://modrinth.com/plugin/boar/",
      stars: "80+",
      commits: "550+",
      cardColor: "#7a534b",
    },
  ];

  const sections: ProjectSectionData[] = [
    {
      logo: "/resources/projects/geysermc_icon.png",
      title: "GeyserMC",
      description:
        "Bringing together the Minecraft community, one project at a time.",
      projects: geysermc,
      githubUrl: "https://github.com/GeyserMC",
      websiteUrl: "https://geysermc.org",
      twitterUrl: "https://x.com/Geyser_MC",
      modrinthUrl: "https://modrinth.com/organization/geysermc",
    },
    {
      logo: "/resources/projects/cloudburst_icon.png",
      title: "CloudburstMC",
      description:
        "Maintains core libraries to power Minecraft: Bedrock Edition servers.",
      projects: cloudburstmc,
      githubUrl: "https://github.com/CloudburstMC",
      websiteUrl: "https://cloudburstmc.org",
      twitterUrl: "https://x.com/CloudburstMC"
    },
    {
      logo: "/resources/ocp_icon.png",
      title: "Incubating",
      description:
        "These projects are in early stages, and might not be fully stable yet.",
      projects: incubating,
      githubUrl: "https://github.com/opencollab-incubator",
      websiteUrl: "https://opencollaboration.dev",
      twitterUrl: "https://x.com/opencollabdev"
    },
  ];
</script>

<svelte:head>
  <title>Adopted Projects</title>
</svelte:head>

<section class="bg-primary py-16 text-center dark:bg-gray-950 sm:py-24">
  <div class="mx-auto pt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1
      class="mb-4 text-4xl font-extrabold tracking-wide text-accent sm:text-5xl"
    >
      Adopted Projects
    </h1>
    <p
      class="mx-auto max-w-3xl text-lg text-primary-100 dark:text-primary-300 sm:text-xl"
    >
      These projects remain free and open-source, with Open Collaboration providing infrastructure, resources, and long-term support.
    </p>
  </div>
</section>

<ProjectSection {...sections[0]} index={0} />
<ProjectSection {...sections[1]} index={1} />
<ProjectSection {...sections[2]} index={2} />
