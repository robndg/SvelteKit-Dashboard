
<script type="ts">
  import { onMount } from 'svelte';
  import PriceChart from '../_components/price-chart.svelte'
  
  // userDefaults store: User settings
  import { userDefaults } from '../.././userDefaults';
  // userBalances store: Wallet balances
  import { userBalances } from '../.././userBalances.js';

  let defaultCurrency: string;

  userDefaults.subscribe(value => {
    defaultCurrency = value.defaultCurrency;
  });

  let cryptoFull: string;
  let walletBalance: number;

  userBalances.subscribe(value => {
    cryptoFull = value.cryptoFull;
    walletBalance = value.walletBalance;
  });
   
  
  </script>
  <div class="p-5 mb-5 rounded-lg bg-zinc-800 sm:flex sm:flex-row-reverse sm:px-6">
    <button type="button" class="inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-zinc-900 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Swap</button>
    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-zinc-900 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Buy</button>
  </div>
  <div class="h-96 rounded-lg bg-zinc-800/70 lg:h-full">
    <PriceChart defaultCurrency={defaultCurrency}/>
  </div>