<script lang="ts">
  import ProjectSection from "$lib/components/adopted-projects/ProjectSection.svelte";

  type ProjectItem = {
    title: string;
    description: string;
    githubUrl: string;
    stars: string;
    commits: string;
  };

  type ProjectSectionData = {
    logo: string;
    title: string;
    description: string;
    projects: ProjectItem[];
    githubUrl: string;
    websiteUrl: string;
    twitterUrl: string;
  };

  const geysermc: ProjectItem[] = [
    {
      title: "Geyser",
      description:
        "Geyser is a program that allows Minecraft: Bedrock Edition clients to join Minecraft: Java Edition servers, allowing for true crossplay between both editions of the game.",
      githubUrl: "https://github.com/GeyserMC/Geyser",
      stars: "5.4k+",
      commits: "4.5k+",
    },
    {
      title: "Floodgate",
      description:
        "Floodgate is a hybrid mode plugin to allow for connections from Geyser to join online mode servers.",
      githubUrl: "https://github.com/GeyserMC/Floodgate",
      stars: "600+",
      commits: "400+",
    },
    {
      title: "MCProtocolLib",
      description:
        "MCProtocolLib is a simple library for communicating with Minecraft clients and servers.",
      githubUrl: "https://github.com/GeyserMC/MCProtocolLib",
      stars: "850+",
      commits: "1.5k+",
    },
  ];

  const cloudburstmc: ProjectItem[] = [
    {
      title: "Protocol",
      description:
        "A protocol library for Minecraft that supports multiple versions.",
      githubUrl: "https://github.com/CloudburstMC/Protocol",
      stars: "350+",
      commits: "850+",
    },
    {
      title: "ProxyPass",
      description:
        "Proxy pass allows developers to MITM a vanilla client and server without modifying them.",
      githubUrl: "https://github.com/CloudburstMC/ProxyPass",
      stars: "150+",
      commits: "150+",
    },
    {
      title: "Nukkit",
      description:
        "Nukkit is a server software for Minecraft: Bedrock Edition.",
      githubUrl: "https://github.com/CloudburstMC/Nukkit",
      stars: "1.3k+",
      commits: "4.0k+",
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
      twitterUrl: "https://x.com/Geyser_MC"
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
