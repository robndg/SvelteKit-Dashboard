
<script type="ts">
  import { onMount } from 'svelte';
  import PriceChart from '../routes/_components/price-chart.svelte';

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

  // User Settings
  let currency = "USD";
  // Selected User Wallet Data
  let cryptoFull = "bitcoin";
  const balance = 0.4;
  // Selected Price History
  let days = 2;
  // Price History
  let pricePrevious;
  let priceHistory: any;
  // Displayed Price Data
  let priceToday: any;
  let percentageIncrease: any;

  let historyData: any;

  // Locale Numbers
  let localPriceToday: any;
  
  /* Test: Use <User Settings> and <Selected Wallet Data> with fetched <PriceHistory> */

  // Invoke this function when the component is mounted to the DOM
  onMount(async () => {
    // Fetch the historical close price data from the API
    const resHistoricalClose = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoFull}/market_chart?vs_currency=${currency}&days=${days}&interval=hourly`);
    priceHistory = await resHistoricalClose.json();
    console.log(priceHistory);

    // Calculate the number of hours that correspond to the number of days specified
    let daysToHours = (days * 24) - 1;
    
    // Get the price from the specified number of days ago
    pricePrevious = priceHistory.prices[daysToHours][1];
    console.log(pricePrevious);

    // Get the current price
    priceToday = (priceHistory.prices[0][1])
    console.log(priceHistory.prices[0][1]);

    localPriceToday = (priceToday.toLocaleString("en-US"));
    
    // Convert the prices to floating point numbers for calculation
    let today = parseFloat(priceToday);
    let previous = parseFloat(pricePrevious);

    // Calculate the increase in price as a percentage (TODO: include changes inclusive of balance)
    let increase = (today - previous) / previous;
    let valueIncrease = balance * increase;

    percentageIncrease = (valueIncrease / balance * 100).toFixed(2);

    // Prop Pass Data to child PriceChart export
    // Init Array
    let pricesData: Array<[string, string]> = priceHistory["prices"];
    let times: string[] = [];
    let amounts: string[] = [];

    for (let [time, price] of pricesData) {
      times.push(time);
      amounts.push(price);
      //historyData = pricesData;
    }
    historyData = pricesData;

    console.log("Times:", times);
    console.log("Amounts:", amounts);
    console.log("Prices:", pricesData);

  });
  
  // TODO: structure of the response data (real-world scenario, more specified)
  type CurrencyData = {
    price: { [key: string]: { priceToday: number } }
  }

  let dataCur: CurrencyData;

</script>
<div class="p-5 mb-5 rounded-lg bg-zinc-800 sm:flex sm:flex-row-reverse sm:px-6">
  <button type="button" class="inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-zinc-900 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Swap</button>
  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-zinc-900 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Buy</button>

{#if priceHistory}
  <p>{currency}: {priceToday}</p>
  <p>{percentageIncrease}</p>
{/if}
</div>
<div class="h-96 rounded-lg bg-zinc-800/70 lg:h-full">
  
  <div class="flex items-baseline justify-between border-b border-zinc-900 pt-10 pb-6 p-5 mb-6">
    <div>
    <h1 class="text-4xl font-bold tracking-tight text-gray-200">${localPriceToday}</h1>
    <p class="text-gray-500">total balance {percentageIncrease}%</p>
    </div>
    <div class="flex items-center">


      <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md border border-indigo-500 px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700">
        <!-- Heroicon name: Bell -->
       1D
      </button>
     <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700">
        <!-- Heroicon name: Bell -->
        1W
      </button>
      <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700">
        <!-- Heroicon name: Bell -->
        1M
      </button>
      <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700">
        <!-- Heroicon name: Bell -->
        1Y
      </button>
      <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700">
        <!-- Heroicon name: Bell -->
        ALL
      </button>
    </div>
  </div>

<PriceChart historyData={historyData}/>
</div>