<script lang="ts">
  import ComingSoon from "$lib/components/our-offer/ComingSoon.svelte";
    import OfferHero from "$lib/components/our-offer/OfferHero.svelte";
  import PricingTiers from "$lib/components/our-offer/PricingTiers.svelte";
  import Tabs from "$lib/components/ui/tabs/Tabs.svelte";

    const bronzeFeatures = [
      "Helpdesk for our adopted projects",
      "1:1 walk-throughs through new APIs and Features",
      "Early security advisories and migration alerts",
      "Partner listing"
    ];
    const silverFeatures = [
      ...bronzeFeatures,
      "Set hours on retainer for feature and issue work",
      "Priority bug fixing",
      "Issue monitoring: Catch issues before users report them"
    ];
    const goldFeatures = [
      ...silverFeatures,
      "Feature Sponsoring",
      "Tailored benefits: Tackling what you need!",
      "Assistance with process automation",
      "Highlighted partner status"
    ];
  
    const networkTiers = [
      {
        name: "Bronze",
        description: "Dedicated support tier",
        features: bronzeFeatures,
        ctaText: "Get in Touch",
        isMostPopular: false,
      },
      {
        name: "Silver",
        description: "More than support: Let's improve your network!",
        features: silverFeatures,
        ctaText: "Let's talk!",
        isMostPopular: true,
      },
      {
        name: "Gold",
        description: "For leaders in the ecosystem.",
        features: goldFeatures,
        ctaText: "Shoot us a message!",
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
        type: "comingSoon",
        content: {
          title: "Up next: Server hosting providers 👀",
          description: "Let's work together to make things simpler. Contact us to be first!",
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

  <div class="bg-background dark:bg-gray-900 min-h-screen">
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