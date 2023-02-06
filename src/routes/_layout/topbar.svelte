<script type="ts">
    import { writable } from "svelte/store";
    import {
      Icon,
      Cake,
      CurrencyDollar,
      CheckCircle,
      Bell,
      Eye,
      QuestionMarkCircle,
      Cog
    } from "svelte-hero-icons";
    // TODO: Import Tooltip
    import SettingsSlide from '../slides/settings-slide.svelte'
  </script>
  <script context="module">
    // Send descrete mode bool to portfolio page
    export const blurMode = writable(false);

    function toggleBlur() {
        blurMode.update(n => !n);
    }

    // Send Toggle show Settings Slide to component
    export const showSettingsSlide = writable(false);

    function toggleSettings() {
        showSettingsSlide.update(n => !n);
    }

  </script>
<!-- Top Bar UI Component-->
<div class="sticky top-0 z-50 bg-zinc-900 p-8 border-b border-zinc-800">
  <div class="flex items-center justify-between">
    <div class="min-w-0 flex-1">
      <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <button type="button" class="inline-flex items-center rounded-xl border border-transparent bg-violet-400/30 px-4 py-2 text-xs font-small text-violet-200 shadow-sm hover:bg-violet-400/40 focus:outline-none">
          <!-- Heroicon name: mini/check -->
          <Icon src="{Cake}" class="mr-1.5 h-5 w-5 flex-shrink-0 text-violet-300" aria-hidden="true" />
          Refer and earn $10
        </button>
      </div>
    </div>
    <div class="flex ml-auto lg:ml-4">
      <span class="sm:ml-3 mr-3">
        <button type="button" class="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-zinc-200 shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2">
          <!-- Heroicon name: mini/check -->
          <Icon src="{CheckCircle}" class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
          <span class="hidden sm:block">Synchronized</span>
        </button>
      </span>
      <!-- Information Centre -->
      <span class="ml-3 hidden sm:block">
        <button type="button" class="inline-flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 rounded-full bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700
        cursor-not-allowed"
        disabled>
          <!-- Heroicon name: Bell -->
          <Icon src="{Bell}" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </button>
      </span>
      <!-- Toggle Descrete Mode -->
      <span class="ml-3">
        <button type="button" class="inline-flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 rounded-full bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700"
        on:click={toggleBlur}>
          <!-- Heroicon name: Eye -->
          <Icon src="{Eye}" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </button>
      </span>
      <!-- Help -->
      <span class="ml-3 hidden sm:block">
        <button type="button" class="inline-flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 rounded-full bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700 cursor-not-allowed"
        disabled>
          <!-- Heroicon name: QuestionMarkCircle -->
          <Icon src="{QuestionMarkCircle}" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </button>
      </span>
      <!-- Settings -->
      <span class="ml-3 sm:ml-3">
        <button type="button" class="inline-flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 rounded-full bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700"
        on:click={toggleSettings}>
          <!-- Heroicon name: Cog -->
          <Icon src="{Cog}" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </button>
        
      </span>
  
    </div>
  </div>
</div>

<SettingsSlide/>