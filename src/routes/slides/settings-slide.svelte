<script lang="ts">
    import { writable } from "svelte/store";
    import Slide from '.././_components/slide.svelte'
    // userDefaults store: User settings
    import { userDefaults } from '../../userDefaults';
    import {
      Icon,
      ChevronDown,
      CheckCircle
    } from "svelte-hero-icons";

    let open = false;
    let editing = false;

    const availableCurrencies = ['USD', 'EUR', 'GBP'];

</script>

<Slide toggleOpen={open} on:close={() => editing = false}>
    <div class="container">
      <div class="mt-3 mx-3">
        <span class="text-lg text-zinc-300 pl-2">App Settings</span>
      </div>
        <div class="flex flex-1 items-center justify-center">
          <div class="flex flex-shrink-0 items-center mt-2">
            <!-- TODO: make hover upload or change handle -->
            <img class="h-24 rounded-full w-auto block" src="https://github.com/{$userDefaults.userGithubName}.png" alt="Your Company">
          </div>
        </div>
        <div class="flex flex-1 items-center justify-center">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <h1 class="bg-zinc-900 text-white px-3 py-2 mt-2 rounded-md text-sm font-medium" >{$userDefaults.userName}</h1>
        </div>
        <div>
          <div class="mt-4 text-center sm:mt-3 sm:ml-4 sm:text-left">
            <h3 class="text-lg font-medium leading-6 text-zinc-200">Profile Information</h3>
          </div>
          <div class="px-3 sm:px-4 pt-3 sm:py-3">
            <input type="text" class="w-full rounded-md border border-zinc-300 bg-zinc-700 text-zinc-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm 
            invalid:border-red-500" value="{$userDefaults.userName}" placeholder="Enter Full Name"/>
          </div>
          <div class="px-3 sm:px-4 pt-3 sm:py-3">
            <input type="text" class="w-full rounded-md border border-zinc-300 bg-zinc-700 text-zinc-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm 
            invalid:border-red-500" value="{$userDefaults.userGithubName}" placeholder="Your Github Handle"/>
          </div>
        </div>

        <!-- Select Currency DropDown -->
     
        <div class="mt-4">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-zinc-200">Assign Default Currency</h3>
              <div class="mt-2">
                <p class="text-sm text-zinc-500">Select a default app currency to update your wallet balance and coin information.</p>
              </div>
            </div>
            <div class="px-3 sm:px-4 pt-3 sm:py-3">
            <div class="relative mt-1">
              <button type="button" class="relative w-full cursor-default rounded-md border border-zinc-300 bg-zinc-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span class="flex items-center">
                  <span class="ml-3 block truncate text-zinc-100">{$userDefaults.defaultCurrency}</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <!-- Heroicon name: mini/chevron-up-down -->
                  <Icon src="{ChevronDown}" class="mr-1.5 h-5 w-5 flex-shrink-0 text-violet-300" aria-hidden="true" />
                </span>
              </button>
          
              <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" >

                {#each availableCurrencies as currency}
                  <li class="text-zinc-300 relative cursor-default select-none py-2 pl-3 pr-9" on:click={() => $userDefaults.defaultCurrency = currency}>
                    <div class="flex items-center">
                      <span class="{currency == $userDefaults.defaultCurrency ? 'font-semibold' : 'font-normal'} ml-3 block truncate">{currency}</span>
                    </div>
                    {#if currency == $userDefaults.defaultCurrency}
                    <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                      <!-- Heroicon name: mini/check -->
                      <Icon src="{CheckCircle}" class="h-5 w-5 flex-shrink-0 text-violet-300" aria-hidden="true" />
                    </span>
                    {/if}
                  </li>
                {/each}

                <!-- Currency Items... -->
              </ul>
            </div>

          <!-- End Select Dropdown-->
            </div>
        </div>
    </div>
</Slide>
