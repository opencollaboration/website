<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { newsItems } from "$lib/assets/news/newsData";
  
    let scroller: HTMLDivElement;
  
    let isInteracting = false;
  
    let inactivityTimer: number;
    const SCROLL_SPEED = 300;
    const INACTIVITY_TIMEOUT = 3000; 
  
    function autoScroll() {
      if (!isInteracting && scroller) {
        scroller.scrollLeft += SCROLL_SPEED;
  
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }
  
      requestAnimationFrame(autoScroll);
    }
  
    function handleUserInteraction() {
      isInteracting = true;
  
      clearTimeout(inactivityTimer);
  
      inactivityTimer = window.setTimeout(() => {
        isInteracting = false;
      }, INACTIVITY_TIMEOUT);
    }
  
    let animationFrameId: number;
  
    onMount(() => {    
      animationFrameId = requestAnimationFrame(autoScroll);
  
      scroller.addEventListener("scroll", handleUserInteraction);
      scroller.addEventListener("mouseenter", handleUserInteraction);
      scroller.addEventListener("mouseleave", handleUserInteraction);
      scroller.addEventListener("touchstart", handleUserInteraction, { passive: true });
      scroller.addEventListener("touchend", handleUserInteraction);
    });
  
    onDestroy(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      clearTimeout(inactivityTimer);
  
      if (scroller) {
        scroller.removeEventListener("scroll", handleUserInteraction);
        scroller.removeEventListener("mouseenter", handleUserInteraction);
        scroller.removeEventListener("mouseleave", handleUserInteraction);
        scroller.removeEventListener("touchstart", handleUserInteraction);
        scroller.removeEventListener("touchend", handleUserInteraction);
      }
    });
  </script>
  
  <section class="bg-white dark:bg-gray-900 py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4">
      <h2
        class="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
      >
        Latest Updates
      </h2>
  
    
      <div
        bind:this={scroller}
        class="relative w-full overflow-x-auto scrollbar-hide [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
      
        <div class="flex flex-row">
          {#each newsItems as item (item.id)}
            <a
              href={item.link}
              class="flex-shrink-0 w-80 mx-4 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div class="flex flex-col h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  class="w-full h-40 object-cover rounded-t-lg"
                />
                <div class="p-4 flex flex-col flex-grow">
                  <h3
                    class="font-bold text-lg text-gray-900 dark:text-white mb-2"
                  >
                    {item.title}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                    {item.snippet}
                  </p>
                </div>
              </div>
            </a>
          {/each}
  
          {#each newsItems as item (`${item.id}-clone`)}
            <a
              href={item.link}
              aria-hidden="true"
              class="flex-shrink-0 w-80 mx-4 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div class="flex flex-col h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  class="w-full h-40 object-cover rounded-t-lg"
                />
                <div class="p-4 flex flex-col flex-grow">
                  <h3
                    class="font-bold text-lg text-gray-900 dark:text-white mb-2"
                  >
                    {item.title}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                    {item.snippet}
                  </p>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>
  
  <style>
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  </style>