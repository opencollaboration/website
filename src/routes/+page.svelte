<script lang="ts">
  import { partners } from "$lib/assets/data/partnerData";
  import GetInvolved from "$lib/components/landing/GetInvolved.svelte";
  import Hero from "$lib/components/landing/Hero.svelte";
  import Mission from "$lib/components/landing/Mission.svelte";
  import Partners from "$lib/components/landing/Partners.svelte";
  import { onMount } from "svelte";

  let partnersWithStatus: typeof partners = $state(partners);

  function checkImage(url: string) {
    return new Promise((resolve) => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  onMount(async () => {
    const results = await Promise.all(
      partners.map(async (p) => {
        const hasImage = await checkImage(p.logo);
        return { ...p, hasImage };
      })
    );
    partnersWithStatus = results;
  });
</script>

<Hero />
<Mission />
<Partners {partnersWithStatus} />
<GetInvolved />
