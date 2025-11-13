<script lang="ts">
  import ComingSoon from "$lib/components/our-offer/ComingSoon.svelte";
    import OfferHero from "$lib/components/our-offer/OfferHero.svelte";
  import PricingTiers from "$lib/components/our-offer/PricingTiers.svelte";
  import Tabs from "$lib/components/ui/tabs/Tabs.svelte";

    const baseFeatures = [
      "Help-desk for supported software",
      "Assistance for updates & new features",
      "Network scaling assistance",
    ];
    const proFeatures = [
      ...baseFeatures,
      "Dedicated 1:1 API walk-throughs",
      "Priority bug fixing",
    ];
    const enterpriseFeatures = [
      ...proFeatures,
      "Feature Sponsoring",
      "Assistance with process automation",
    ];
  
    const networkTiers = [
      {
        name: "Builder",
        description: "Essential support for growing networks getting off the ground.",
        features: baseFeatures,
        ctaText: "Get in Touch",
        isMostPopular: false,
      },
      {
        name: "Architect",
        description: "For established networks that require priority access and deeper collaboration.",
        features: proFeatures,
        ctaText: "Contact Sales",
        isMostPopular: true,
      },
      {
        name: "Enterprise",
        description: "Full-scale partnership to sponsor features and automate your entire workflow.",
        features: enterpriseFeatures,
        ctaText: "Let's Talk",
        isMostPopular: false,
      },
    ];
  
    const hostingTiers = [...networkTiers];
  
    const tabsData = [
      {
        id: "networks",
        label: "Server Networks",
        type: "tiers",
        content: {
          tiers: networkTiers,
        },
      },
      {
        id: "hosting",
        label: "Hosting Providers",
        type: "tiers",
        content: {
          intro: "Our plans for hosting providers focus on mass-scale deployments and panel integrations. Contact us for custom-tailored solutions.",
          tiers: hostingTiers,
        },
      },
      {
        id: "marketplace",
        label: "Marketplace",
        type: "comingSoon",
        content: {
          title: "Marketplace is Launching Soon",
          description: "A dedicated place to buy and sell plugins, configurations, and services for your server. Get notified when we go live.",
        },
      },
    ];
  
    let activeTab = tabsData[0].id;
    $: currentTab = tabsData.find((tab) => tab.id === activeTab);
  </script>
  
  <svelte:head>
  <title>Our Offer</title>
</svelte:head>

  <div class="bg-white dark:bg-gray-900 min-h-screen">
    <OfferHero />
    <main class="container mx-auto px-4 py-12 sm:py-16">
      
      <Tabs {tabsData} bind:activeTab />
  
      <div class="mt-12">
        {#if currentTab}
          {#if currentTab.type === 'tiers'}
            <PricingTiers 
              tiers={currentTab.content.tiers} 
              intro={currentTab.content.intro} 
            />
          {:else if currentTab.type === 'comingSoon'}
            <ComingSoon content={currentTab.content} />
          {/if}
        {/if}
      </div>
    </main>
  </div>