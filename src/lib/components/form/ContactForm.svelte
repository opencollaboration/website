<script>
  import { goto } from "$app/navigation";
  import { Check, MailIcon, TwitterIcon, XIcon } from "@lucide/svelte";
  import { fade } from "svelte/transition";

  const formFields = [
    {
      id: "name",
      component: "input",
      type: "text",
      placeholder: "Name*",
    },
    {
      id: "email",
      component: "input",
      type: "email",
      placeholder: "Email*",
    },
    {
      id: "source",
      component: "select",
      placeholder: "How did you find us?",
      options: [
        { value: "google", label: "Google" },
        { value: "social", label: "Social Media" },
        { value: "friend", label: "From a friend" },
        { value: "github", label: "Found on GitHub " },
        { value: "discord", label: "Found on Discord" }
      ],
    },
    {
      id: "message",
      component: "input",
      type: "text",
      placeholder: "Don't be shy! Just say hi :)",
    }
  ];

  let formData = {
    name: "",
    email: "",
    source: "",
    message: ""
  };

  let errors = {};
  let submitted = false;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      submitted = true;
    } else {
      console.log("Form has validation errors:", errors);
    }
  };
</script>

<div
  class="min-h-screen bg-gradient-to-br from-gray-100 to-white/80 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mt-10 p-4 sm:p-6 lg:p-8"
>
  {#if submitted}
    <div
      in:fade
      class="flex items-center justify-center flex-col bg-green-100/10 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-white p-4 rounded-md"
    >
      <h1 class="text-4xl lg:text-6xl font-bold">Thank You!</h1>
      <span>
        <Check class="h-48 w-48 text-green-500" />
      </span>
      <p class="max-w-2xl mx-10 text-center">
        Thanks for contacting us!. We will get back to you shortly, in the meantime: Check our adopted
        projects!
      </p>
      <button
        class="my-2 bg-indigo-500 py-2 px-4 cursor-pointer"
        on:click={() => {
          goto("/adopted-projects");
        }}>Go to Adopted Projects</button
      >
    </div>
  {:else}
    <div
      class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-6xl w-full"
    >
      <div class="w-full md:w-1/2 p-8 sm:p-12">
        <h1
          class="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-3"
        >
          <span class="text-indigo-500">Contact </span> Us
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base">
          Want to become a part of the Open Collaboration Project? Let's talk!
        </p>
        <form on:submit|preventDefault={handleSubmit} novalidate>
          <div class="space-y-6">
            {#each formFields as field (field.id)}
              <div>
                {#if field.component === "input"}
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    bind:value={formData[field.id]}
                    class="w-full p-3 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 border rounded-md focus:ring-2 focus:outline-none transition {errors[
                      field.id
                    ]
                      ? 'border-red-500'
                      : 'border-gray-200 dark:border-slate-600'} focus:ring-indigo-500"
                  />
                {:else if field.component === "select"}
                  <select
                    bind:value={formData[field.id]}
                    class="w-full p-3 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                  >
                    <option value="" disabled>{field.placeholder}</option>
                    {#each field.options as option}
                      <option value={option.value}>{option.label}</option>
                    {/each}
                  </select>
                {/if}

                {#if errors[field.id]}
                  <p class="text-red-500 text-xs mt-1">{errors[field.id]}</p>
                {/if}
              </div>
            {/each}
          </div>
          <div class="flex items-center justify-center flex-col">
            <button
              type="submit"
              class="w-full cursor-pointer mt-8 bg-indigo-500 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-600 active:bg-indigo-700 transition-colors duration-300"
            >
              SEND
            </button>
          
            <span class="my-4"> or </span>
          
            <a
              href="https://discord.com/users/384800189975887892"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full cursor-pointer bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                class="text-white" 
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                />
              </svg>
              Chat on Discord!
            </a>
          </div>
        </form>
        <div
        class="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 text-xs"
      >
        <a
          href="https://twitter.com/opencollaboration"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:opacity-80 transition-opacity"
        >
          <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <span class="text-lg"> X</span>
            <div>
              <span class="font-bold">Twitter / X</span><br />@opencollaboration
            </div>
          </div>
        </a>
    
        <a 
          href="mailto:contact@opencollaboration.dev"
          class="hover:opacity-80 transition-opacity"
        >
          <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <MailIcon />
            <div>
              <span class="font-bold">EMAIL</span><br
              />contact@opencollaboration.dev
            </div>
          </div>
        </a>
    </div>
      </div>

      <div class="w-full md:w-1/2 hidden md:block">
        <img
          src="/resources/upbg3.png"
          alt="hero snippet img"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  {/if}
</div>
