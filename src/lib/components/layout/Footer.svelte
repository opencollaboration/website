<script lang="ts">
  interface NavItem {
    name: string;
    href: string;
  }

  interface SocialItem {
    name: string;
    href: string;
    icon?: string;
  }

  let navItems: NavItem[] = [
    { name: "Our Mission", href: "/our-mission" },
    { name: "Adopted Projects", href: "/adopted-projects" },
    { name: "Offers", href: "/our-offer" },
    { name: "Our Team", href: "/our-team" },
    { name: "Chat with us!", href: "/contact" },
  ];

  let socials: SocialItem[] = [
    {
      href: "mailto:contact@opencollaboration.dev",
      name: "contact@opencollaboration.dev",
    },
    {
      href: "https://x.com/opencollabdev",
      name: "X (formerly twitter)",
    },
    {
      href: "https://github.com/opencollaboration",
      name: "GitHub",
    },
  ];
</script>

<footer class="bg-gray-300 dark:bg-gray-950 text-white py-12" id="contact">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      <div>
        <h4
          class="text-base text-accent dark:text-accent sm:text-lg font-semibold mb-4"
        >
          Navigation
        </h4>
        <ul
          class="space-y-2 sm:space-y-3 text-accent dark:text-white text-xs sm:text-sm"
        >
          {#each navItems as item}
            <li>
              <a
                href={item.href}
                class="hover:text-primary-400 dark:hover:text-accent transition duration-150 break-words"
              >
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <div>
        <h4
          class="text-base sm:text-lg text-accent dark:text-accent font-semibold mb-4"
        >
          Info
        </h4>
        <ul
          class="space-y-2 sm:space-y-3 text-accent dark:text-white text-xs sm:text-sm"
        >
          <li>
            <a
              href="/our-team"
              class="hover:text-primary-400 dark:hover:text-accent transition duration-150"
              >Our Team</a
            >
          </li>
          <li>
            <a
              href="https://ziax.com/terms/privacy-policy/"
              class="hover:text-primary-400 dark:hover:text-accent transition duration-150"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>

      <div class="col-span-2 md:col-span-1">
        <h4
          class="text-base sm:text-lg text-accent dark:text-accent font-semibold mb-4"
        >
          Get in Touch
        </h4>
        <ul
          class="space-y-2 sm:space-y-3 text-accent dark:text-white text-xs sm:text-sm"
        >
          {#each socials as social}
            <li>
              <a
                href={social.href}
                class="hover:text-primary-400 dark:hover:text-accent transition duration-150 break-all"
              >
                {social.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div
      class="border-t border-gray-700 dark:border-accent text-accent dark:text-white mt-8 sm:mt-10 pt-6 text-center"
    >
      <p class="text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} Open Collaboration. All rights reserved.
      </p>
      <p class="text-xs sm:text-sm mt-2 text-gray-500">
        This website is not an official Minecraft website and is not associated
        with Mojang Studios or Microsoft.
      </p>
      <p class="text-xs sm:text-sm mt-2 text-gray-500">
        All product and company names are trademarks or registered trademarks of
        their respective holders.
      </p>
    </div>
  </div>
</footer>
