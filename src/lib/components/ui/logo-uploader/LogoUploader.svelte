<script lang="ts">
  import { ImageIcon, ImagePlusIcon } from "@lucide/svelte";
  import { onDestroy } from "svelte";

  let { label, namePrefix } = $props<{
    label: string;
    namePrefix: string;
  }>();

  let fileInput: HTMLInputElement;
  let file = $state<File | null>(null);
  let previewUrl = $state<string | null>(null);
  let hue = $state(0);
  let inverted = $state(false);
  let isDragging = $state(false);

  function handleFileSelect(files: FileList | null) {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/svg+xml",
        ].includes(selectedFile.type)
      ) {
        alert("Invalid file type. Please select an image.");
        return;
      }

      file = selectedFile;
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      previewUrl = URL.createObjectURL(file);
      hue = 0;
      inverted = false;
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      handleFileSelect(files);
      fileInput.files = files;
    }
  }

  onDestroy(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  });
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
    {label}
  </label>

  <input
    bind:this={fileInput}
    id={namePrefix}
    name={namePrefix}
    type="file"
    class="sr-only"
    required
    accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
    onchange={(e) =>
      handleFileSelect((e.currentTarget as HTMLInputElement).files)}
  />

  <div
    class="mt-1 flex justify-center px-6 py-8 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md transition-colors"
    class:border-indigo-500={isDragging}
    class:dark:border-indigo-400={isDragging}
    ondragenter={() => (isDragging = true)}
    ondragover={(e) => e.preventDefault()}
    ondragleave={() => (isDragging = false)}
    ondrop={handleDrop}
  >
    <div class="space-y-1 text-center w-full">
      {#if previewUrl && file}
        <div class="relative group w-48 mx-auto bg-gray-100">
          <img
            src={previewUrl}
            alt="Logo Preview"
            class="mx-auto h-24 w-auto object-contain transition-all"
            style:filter="hue-rotate({hue}deg) {inverted ? 'invert(1)' : ''}"
          />
          <div
            onclick={() => fileInput.click()}
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        <div class="mt-4 px-4">
          <div>
            <label
              for="{namePrefix}-hue"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              Adjust Hue: {hue}°
            </label>
            <input
              id="{namePrefix}-hue"
              type="range"
              min="0"
              max="360"
              bind:value={hue}
              class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div class="flex items-center justify-between mt-3">
            <label
              for="{namePrefix}-invert"
              class="text-sm text-gray-500 bg-indigo-500 text-white px-4 py-2 cursor-pointer rounded dark:text-gray-400"
            >
              Invert Colors
            </label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="{namePrefix}-invert"
                bind:checked={inverted}
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"
              ></div>
            </label>
          </div>

          <input type="hidden" name="{namePrefix}Hue" value={hue} />
          <input type="hidden" name="{namePrefix}Inverted" value={inverted} />
        </div>
      {:else}
        <div class="flex items-center flex-col justify-center my-10">
          <ImagePlusIcon
            class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 "
          />
          <div
            class="flex justify-center text-sm text-gray-600 dark:text-gray-400"
          >
            <label
              for={namePrefix}
              class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              <span>Upload a file</span>
            </label>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-500">
            PNG, JPG, GIF, WEBP, SVG
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
