<script lang="ts">
  let { activeTab = $bindable(), tabsData } = $props();
</script>

<div class="border-b border-gray-200 dark:border-gray-700">
  <div
    class="max-w-2xl mx-auto flex justify-center -mb-px space-x-4 sm:space-x-8"
    aria-label="Tabs"
  >
    {#each tabsData as tab}
      <button
        on:click={() => (activeTab = tab.id)}
        class="whitespace-nowrap py-4 px-1 border-b-2 cursor-pointer font-medium text-sm transition-colors duration-200"
        class:border-indigo-500={activeTab === tab.id}
        class:text-indigo-600={activeTab === tab.id}
        class:dark:text-indigo-400={activeTab === tab.id}
        class:border-transparent={activeTab !== tab.id}
        class:text-gray-500={activeTab !== tab.id}
        class:hover:border-gray-300={activeTab !== tab.id}
        class:hover:text-gray-700={activeTab !== tab.id}
        class:dark:text-gray-400={activeTab !== tab.id}
        class:dark:hover:border-gray-500={activeTab !== tab.id}
      >
        {tab.label}
      </button>
    {/each}
  </div>
</div>
