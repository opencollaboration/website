<script lang="ts">
  import { onDestroy } from "svelte";
  import type { Partner } from "../../../routes/+page.server";
  let { partners } = $props<{ partners: Partner[] }>();

  const INACTIVITY_TIMEOUT = 2000;
  const PIXELS_PER_SECOND = 60;

  let isRunning = $state(true);
  let animationDuration = $state(320);
  let marqueeTrack: HTMLDivElement;
  let inactivityTimeoutId: ReturnType<typeof setTimeout>;

  function pauseAnimation() {
    isRunning = false;
    clearTimeout(inactivityTimeoutId);
    inactivityTimeoutId = setTimeout(() => {
      isRunning = true;
    }, INACTIVITY_TIMEOUT);
  }

  $effect(() => {
    if (marqueeTrack) {
      const measureWidth = () => {
        const contentWidth = marqueeTrack.scrollWidth / 2;
        if (contentWidth > 0) {
          animationDuration = contentWidth / PIXELS_PER_SECOND;
        }
      };
      requestAnimationFrame(measureWidth);
    }
  });

  onDestroy(() => {
    clearTimeout(inactivityTimeoutId);
  });
</script>

<section
  class="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h3
        class="text-3xl sm:text-4xl font-extrabold tracking-wider text-primary-900 dark:text-white mb-4"
      >
        Backed by our
        <span
          class="tracking-wide font-extrabold beachday text-primary dark:text-accent"
        >
          Partners
        </span>
      </h3>
      <p
        class="text-base sm:text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto"
      >
        We collaborate with leading commercial users to support and sustain free
        and open-source software in the Minecraft ecosystem.
      </p>
    </div>

    <div
      class="marquee-container"
      role="region"
      aria-label="Partners Carousel"
      onpointerdown={pauseAnimation}
      onfocusin={pauseAnimation}
      onwheel={pauseAnimation}
    >
      <div
        class="marquee-track p-10"
        class:is-running={isRunning}
        style:--duration="{animationDuration}s"
        bind:this={marqueeTrack}
      >
        {#each partners as partner (partner.slug + "1")}
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            class="partner-card hover:shadow-md"
          >
            <div
              class="mb-6 h-24 sm:h-32 w-full flex items-center justify-center"
            >
              <img
                src={partner.lightLogo.path}
                alt={partner.name}
                class="max-h-full max-w-full object-contain dark:hidden"
                loading="lazy"
                style:filter="hue-rotate({partner.lightLogo.hue}deg) {partner
                  .lightLogo.inverted
                  ? 'invert(1)'
                  : ''}"
              />
              <img
                src={partner.darkLogo.path}
                alt={partner.name}
                class="max-h-full max-w-full object-contain hidden dark:block"
                loading="lazy"
                style:filter="hue-rotate({partner.darkLogo.hue}deg) {partner
                  .darkLogo.inverted
                  ? 'invert(1)'
                  : ''}"
              />
            </div>
            <h4
              class="text-lg sm:text-xl font-bold text-primary-900 dark:text-white mb-3"
            >
              {partner.name}
            </h4>
            <p class="text-sm text-primary-600 dark:text-primary-300">
              {partner.description}
            </p>
          </a>
        {/each}

        {#each partners as partner (partner.slug + "2")}
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            class="partner-card hover:shadow-md"
            aria-hidden="true"
          >
            <div
              class="mb-6 h-24 sm:h-32 w-full flex items-center justify-center"
            >
              <img
                src={partner.lightLogo.path}
                alt={partner.name}
                class="max-h-full max-w-full object-contain dark:hidden"
                loading="lazy"
                style:filter="hue-rotate({partner.lightLogo.hue}deg) {partner
                  .lightLogo.inverted
                  ? 'invert(1)'
                  : ''}"
              />
              <img
                src={partner.darkLogo.path}
                alt={partner.name}
                class="max-h-full max-w-full object-contain hidden dark:block"
                loading="lazy"
                style:filter="hue-rotate({partner.darkLogo.hue}deg) {partner
                  .darkLogo.inverted
                  ? 'invert(1)'
                  : ''}"
              />
            </div>
            <h4
              class="text-lg sm:text-xl font-bold text-primary-900 dark:text-white mb-3"
            >
              {partner.name}
            </h4>
            <p class="text-sm text-primary-600 dark:text-primary-300">
              {partner.description}
            </p>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .marquee-container {
    overflow: hidden;
    position: relative;
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 1) 90%,
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 1) 90%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .marquee-track {
    display: flex;
    gap: 2rem;
    width: max-content;
    animation: marquee var(--duration) linear infinite;
  }

  .marquee-track:not(.is-running) {
    animation-play-state: paused;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .partner-card {
    flex-shrink: 0;
    width: 320px;
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
  }

  .partner-card:hover {
    transform: scale(1.05);
  }

  :global(.dark) .partner-card {
    background-color: #1f2937;
  }

  @media (max-width: 640px) {
    .partner-card {
      width: 280px;
      gap: 1.5rem;
    }
    .marquee-track {
      gap: 1.5rem;
    }
  }
</style>
