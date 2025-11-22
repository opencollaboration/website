<script lang="ts">
  import IconHamburger from "../icons/IconHamburger.svelte";
  import ThemeToggle from "$lib/components/ui/toggle/ThemeToggle.svelte";

  interface NavItem {
    name: string;
    href: string;
  }

  let navItems: NavItem[] = [
    { name: "Our Mission", href: "/our-mission" },
    { name: "Adopted Projects", href: "/adopted-projects" },
    { name: "Offers", href: "/our-offer" },
    { name: "Our Team", href: "/our-team" },
    { name: "Chat with us!", href: "/contact" },
  ];

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function handleNavClick() {
    mobileMenuOpen = false;
  }
</script>

<header
  class="fixed top-0 w-full z-50 bg-gray-800/80 backdrop-blur-sm shadow-md"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Title -->
      <a
        href="/"
        class="flex items-center space-x-2 text-2xl font-bold tracking-wider"
      >
        <img
          src="/resources/ocp_icon.png"
          alt="Open Collaboration Logo"
          class="h-10 w-auto"
        />
        <span class="text-sm lg:text-2xl beachday text-primary dark:text-accent"
          >Open Collaboration</span
        >
      </a>

      <!-- Desktop Navigation & Toggle -->
      <nav class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a
            href={item.href}
            class="text-secondary hover:text-accent font-medium transition duration-150 ease-in-out"
          >
            {item.name}
          </a>
        {/each}

        <ThemeToggle />
      </nav>

      <!-- Mobile Menu Controls -->
      <div class="md:hidden flex items-center space-x-2">
        <ThemeToggle />
        <button
          onclick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          class="p-2 rounded-lg text-primary-500 dark:text-primary-300 hover:text-primary-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <IconHamburger />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <nav class="md:hidden pb-4 space-y-1">
        {#each navItems as item}
          <a
            href={item.href}
            onclick={handleNavClick}
            class="block px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition duration-150"
          >
            {item.name}
          </a>
        {/each}
      </nav>
    {/if}
  </div>
</header>
