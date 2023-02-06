<script lang="ts">
    import { fade } from "svelte/transition";
    import {
      Icon,
      Speakerphone,
      X
    } from "svelte-hero-icons";
    let showBanner = true;
</script>
<!-- Demo Banner. TODO: make component for future banners -->
{#if showBanner}
<div class="rounded-md bg-indigo-600 mb-3" out:fade>
    <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex w-0 flex-1 items-center">
          <span class="flex rounded-lg bg-indigo-800 p-2">
            <Icon src="{Speakerphone}" class="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
          </span>
          <p class="ml-3 truncate font-medium text-white">
            <span class="md:hidden">Demo release for SvelteKit dashboard!</span>
            <span class="hidden md:inline">Big news! Excited to announce the demo of our SvelteKit Dashboard.</span>
          </p>
        </div>
    
        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button type="button" class="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
          on:click={() => showBanner=false}>
            <span class="sr-only">Dismiss</span>
            <Icon src="{X}" class="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}