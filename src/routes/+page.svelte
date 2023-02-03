
<script type="ts">
  import { onMount } from 'svelte';
  import PriceChart from '../routes/_components/price-chart.svelte';

  // User Settings
  let currency = "USD";
  // Selected User Wallet Data
  let cryptoFull = "bitcoin";
  const balance = 0.4;
  // Selected Price History
  let days = 1;
  // Price History
  let pricePrevious;
  let priceHistory: any;
  // Displayed Price Data
  let priceToday: any;
  let percentageIncrease: any;

  let historyData: any;
  
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
    priceToday = priceHistory.prices[0][1];
    console.log(priceHistory.prices[0][1]);

    // Convert the prices to floating point numbers for calculation
    let today = parseFloat(priceToday);
    let previous = parseFloat(pricePrevious);

    // Calculate the increase in price as a percentage (TODO: include changes inclusive of balance)
    let increase = (today - previous) / previous;
    let valueIncrease = balance * increase;
    percentageIncrease = valueIncrease / balance * 100;

    // Prop Pass Data to child PriceChart export
    // Init Array
    let pricesData: Array<[string, string]> = priceHistory["prices"];
    let times: string[] = [];
    let amounts: string[] = [];

    for (let [time, price] of pricesData) {
      times.push(time);
      amounts.push(price);
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

{#if priceHistory}
  <p>{currency}: {priceToday}</p>
  <p>{percentageIncrease}</p>
{/if}

<PriceChart historyData={historyData}/>
