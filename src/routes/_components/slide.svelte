<script lang="ts">
    import { fade, slide, fly } from "svelte/transition";
    import { showSettingsSlide } from "../_layout/topbar.svelte";
    import { onMount } from 'svelte';
    import {
      Icon,
      ChevronRight
    } from "svelte-hero-icons";

    export let open = false;
    export let onClose = undefined; // TODO: work on transition
    export let toggleOpen;

   let editing = false
   let isSlidingIn = false;

    $: if (editing) {
        open = true;
        isSlidingIn = true;
    }

    $: className = isSlidingIn ? 'slide-in-right' : '';

    function closeSlide() {
        open = false;
        setTimeout(() => {
            isSlidingIn = false;
            open = false;
            editing = false;
            showSlide = false;
            showSettingsSlide.update(n => !n); // update external settings to fix double click bug
        }, 200);
    }

    let showSlide: any;
    // Toggle descrete Mode from TopBar
    onMount(() => {
        showSettingsSlide.subscribe(value => {
            showSlide = value; // Can use later for what slide to show
        });
    });
</script>
{#if showSlide}
<div class="relative z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" class:open={open} in:fade out:fade>

    <div class="fixed inset-0 bg-zinc-900/80 transition-opacity"></div>
  
    <div class="fixed inset-0 overflow-hidden ">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

          <div class="pointer-events-auto relative w-screen max-w-md">

            <div class="absolute top-40 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
              <button type="button" class="rounded-md bg-zinc-500 text-zinc-800 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-white"
              on:click={() => closeSlide()}>
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: outline/x-mark -->
                <Icon src="{ChevronRight}" class="h-8 w-8 flex-shrink-0" aria-hidden="true" />
              </button>
            </div>
  
            <div class="flex h-full flex-col overflow-y-scroll bg-zinc-800 py-6 shadow-xl {className}" in:slide={{duration: 1000, }} out:fade>
           
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
            
                <div class="absolute inset-0 px-4 sm:px-6">
                  <div class="h-full border-2 border-2 border-zinc-700 content" aria-hidden="true">

                    <slot></slot>

                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/if}

  <style lang="scss">
    .content {
        min-width: 400px;
        position: absolute;
        bottom: 0px;
        max-height: calc(100vh - var(--top-bar-height));
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
    }
 
 </style>