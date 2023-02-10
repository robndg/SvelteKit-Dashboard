<script type="ts">
    import { fade, scale } from "svelte/transition";

    export let show: boolean;
   // export let close
    export let title: string;
  
    const id = "alert-time" // TODO: add unique id if multiple
</script>
  
{#if show}
 

<div class="relative z-50" aria-labelledby="modal-title-{title}" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-zinc-800/75 transition-opacity" in:fade out:fade></div>
  
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

        <div class="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" in:scale out:fade>
            <slot />
        </div>
      </div>
    </div>
  </div>

{/if}