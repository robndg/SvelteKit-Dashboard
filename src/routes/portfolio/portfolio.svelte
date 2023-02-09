
<script type="ts">
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  import { fade, scale } from "svelte/transition";
  import { blurMode } from "../_layout/topbar.svelte";
  // Index Page, Portfolio
  import PriceChart from './_components/price-chart.svelte'
  // Import Alert
  import Alert from '../_components/misc/alert.svelte'
  
  // userDefaults store: User settings
  import { userDefaults } from '../../userDefaults';
  // userBalances store: Wallet balances
  import { userBalances } from '../../userBalances.js';
  import {
      Icon,
      ExclamationCircle
    } from "svelte-hero-icons";

  
    let days = 80;
    // Price History
    let pricePrevious;
    let priceHistory: any;
    // Displayed Price Data
    let priceToday: any;
    let percentageIncrease: any;
    let historyData: any;

    let daysToHours: any;
    // Locale Numbers
    let localPriceToday: any;

    let triggerRender:boolean = false;

    let fetchCount = 0;
    let fetching = false;
    // Trigger Slowdown alert. If fetch fails. Click to reset. TODO: rate limit before, rather new ways fetch less (10-50 /min)
    let triggerSlowdown:boolean = false;
    // Trigger Inactive alert. Stop fetching. After 10 min. Click to reset
    let triggerInactivity:boolean = false;

    // Current Error
    let triggerError:boolean = false;
    let errorMessage:string;
    let errorTitle:string = "Alert";

    async function fetchData() {
      console.log("fetchData")
      console.log($userDefaults.defaultCurrency);
      
        if(!fetching){ // avoid fetch trigger spam
          console.log('fetching!')
          fetching = true;
          // Fetch the historical close price data from the API
          const resHistoricalClose = await self.fetch(`https://api.coingecko.com/api/v3/coins/${$userBalances.cryptoFull}/market_chart?vs_currency=${$userDefaults.defaultCurrency}&days=${days}&interval=minute`);

          if (resHistoricalClose.ok) {
            priceHistory = await resHistoricalClose.json();
   
            console.log("priceHistory");

            console.log(priceHistory);

            console.log(days);
            // Calculate the number of hours that correspond to the number of days specified
            daysToHours = (days * 24) - 1;
            console.log(daysToHours);
            // Get the price from the specified number of days ago
            pricePrevious = priceHistory.prices[daysToHours - 1][1];
            //console.log(pricePrevious);

            // Get the current price
            priceToday = (priceHistory.prices[daysToHours][1])
            //console.log(new Date(priceHistory.prices[daysToHours][0]).toString())
            //console.log(priceHistory.prices[daysToHours][1]);

            localPriceToday = new Intl.NumberFormat('en-US', { style: 'currency', currency: $userDefaults.defaultCurrency }).format(priceToday);

            // Convert the prices to floating point numbers for calculation
            let today = parseFloat(priceToday);
            let previous = parseFloat(pricePrevious);

            // Calculate the increase in price as a percentage (TODO: include changes inclusive of balance)
            let increase = (today - previous) / previous;
            let valueIncrease = $userBalances.walletBalance * increase;

            percentageIncrease = (valueIncrease / $userBalances.walletBalance * 100).toFixed(2);

            // Prop Pass Data to child PriceChart export
            // Init Array
            let pricesData: Array<[number, string]> = priceHistory["prices"];
            let times: string[] = [];
            let amounts: string[] = [];
            console.log("Portfolio days, daysToHours:")
            daysToHours = (days * 24) - 1;
            console.log(days);
            console.log(daysToHours);
            for (let [time, price] of pricesData/*.slice(0, daysToHours)*/) {
                times.push(time);
                amounts.push(price);
            //historyData = pricesData;
            }
            historyData = pricesData.reverse();

            console.log("Times:", times);
            console.log("Amounts:", amounts);
            console.log("Prices:", pricesData);
            // For now remove inner html for new chart to draw (TODO: works with only price-chart html remove)
            const element = document.getElementById("chart-container");
            if(element != null){
              element.innerHTML = "";
            }

            triggerRender != triggerRender;
            fetchCount += 1;
            fetching = false;
           /* triggerError = true;
            triggerSlowdown = true;
            errorTitle = "Slowdown"
            errorMessage = "You're moving too fast for us. Try again?";*/
          } else {
              triggerError = true;
              triggerSlowdown = true;
              console.log('triggerSlowdown update', triggerSlowdown);
              errorTitle = "Slowdown"
              errorMessage = "You're moving too fast for us. Try again?";
              throw new Error();
          }
        }
        console.log(fetchCount);
      } // end async function fetch data
  
    let currency = $userDefaults.defaultCurrency;

    userDefaults.subscribe((conf) => {
      if (conf.defaultCurrency !== currency) {
        currency = conf.defaultCurrency;
        fetchData();
      }
    })

    let interval: any = undefined;
    let blurClass: any;

    onMount(() => {
      console.log(fetchCount);
      fetchData()
      interval = setInterval(() => {
        if(!triggerError){
          fetchData();
        }else{
          console.log('triggerInactivity', triggerInactivity)
          console.log('triggerSlowDown', triggerSlowdown)
        }
        console.log('interval', interval)
      }, 1000 * 30) // Fetch history data (avoid rate limit)

      blurMode.subscribe(value => {
        blurClass = value ? "blur-sm" : "";
      });
    });

    onDestroy(() => {
      clearInterval(interval);
    })

    function resetTriggerOK(){
      console.log("Trigger Reset")
      triggerInactivity = false;
      triggerSlowdown = false;
      triggerError = false;
      fetching = false;
      fetchData();
    }

  </script>
    <!-- TODO: Add Carousel for latest features
    <div class="p-5 mb-5 rounded-lg bg-zinc-800 sm:flex sm:px-6 flex justify-between">
     
    </div>-->

  <Alert title='{errorTitle}' show={triggerError} >
    <div class="bg-zinc-900/70 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-800 sm:mx-0 sm:h-10 sm:w-10">
          <!-- Heroicon name: outline/exclamation-circle -->
          <Icon src="{ExclamationCircle}" class="w-6 h-6 flex-shrink-0 text-red-300" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg font-medium leading-6 text-zinc-100" id="modal-title-{errorTitle}">{errorTitle}</h3>
          <div class="mt-2">
            <p class="text-sm text-zinc-400">{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-zinc-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" 
      on:click={resetTriggerOK}>Yes, got it!</button>
    </div>
  </Alert>

 

 
  {#key triggerRender}
  <div class="rounded-lg bg-zinc-800/70 h-full">

      <div class="pt-6 px-3 sm:flex sm:px-6 flex justify-between">
        <div>
          {#if localPriceToday}
          <h1 class="text-4xl font-bold tracking-tight text-gray-200" class:blur-sm={blurClass} in:scale out:fade>{localPriceToday}</h1>
          {/if}
          <p class="text-gray-500">total balance</p>
        </div>
        <div>
          <button type="button" class="inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-zinc-900 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Swap</button>
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-zinc-900 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Buy</button>
        </div>
      </div>
      
    <PriceChart days={days} historyData={historyData} percentageIncrease={percentageIncrease}/>
  </div>
  {/key}