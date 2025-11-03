<script>
  import { goto } from "$app/navigation";
  import { Check } from "@lucide/svelte";
  import { fade } from "svelte/transition";

  const formFields = [
    {
      id: "name",
      component: "input",
      type: "text",
      placeholder: "Name *",
    },
    {
      id: "email",
      component: "input",
      type: "email",
      placeholder: "Email *",
    },
    {
      id: "company",
      component: "input",
      type: "text",
      placeholder: "Company (Optional)",
    },
    {
      id: "source",
      component: "select",
      placeholder: "How did you find us?",
      options: [
        { value: "google", label: "Google" },
        { value: "social", label: "Social Media" },
        { value: "friend", label: "From a friend" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  let formData = {
    name: "",
    email: "",
    phone: "",
    source: "",
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
  class="min-h-screen bg-gradient-to-br from-gray-100 to-white/80 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8"
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
        Thanks a bunch for filling that out. It means a lot to us, we will get
        back to you shortly, in the meantime make sure to check our adopted
        projects.
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
          <span class="text-indigo-500">Join </span> Us
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base">
          Want to be a part of the Open Collaboration to support OSS? Join now!
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

          <button
            type="submit"
            class="w-full cursor-pointer mt-8 bg-indigo-500 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-600 active:bg-indigo-700 transition-colors duration-300"
          >
            SEND
          </button>
        </form>
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
