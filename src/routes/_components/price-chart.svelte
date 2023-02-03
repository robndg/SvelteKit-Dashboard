<script type="ts">
    import 'anychart';
    import { onMount } from 'svelte';

    // userBalances store: Wallet balances
    import { userBalances } from '../.././userBalances.js';
    
    let cryptoFull: string;
    let walletBalance: number;

    userBalances.subscribe(value => {
        cryptoFull = value.cryptoFull;
        walletBalance = value.walletBalance;
    });

    // Default Currency
    export let defaultCurrency: string;

    // Price History
    let pricePrevious;
    let priceHistory: any;
    // Displayed Price Data
    let priceToday: any;
    let percentageIncrease: any;

    /* Page Data */
    let days = 1; // TimeFrame
    let historyData: any; // Time vs (Amount + TODO: add balance %)
    // Locale Numbers
    let localPriceToday: any;
    
    /* Test: Use <User Settings> and <Wallet Data> with fetched <PriceHistory> vs TimeFrame (days) */

    // Invoke this function when the component is mounted to the DOM
    onMount(async () => {
        // Fetch the historical close price data from the API
        const resHistoricalClose = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoFull}/market_chart?vs_currency=${defaultCurrency}&days=${days}&interval=hourly`);
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
        let valueIncrease = walletBalance * increase;

        percentageIncrease = (valueIncrease / walletBalance * 100).toFixed(2);

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


        // Map Date and price Data
        let chartData = historyData.map(data => [new Date(data[0]).toString(), data[1]]);

        anychart.onDocumentReady(function() {
            // create a pie chart
            var chart = anychart.area(chartData);
            // Start at y 0
            chart.yScale().minimum(0);
            // Styles
            chart.normal().stroke("#8980d5");
            chart.dataArea().background().enabled(false);
            //chart.dataArea().background().fill(['0 #18181b 1', '0.4 #18181b 0'], 90, true);
            chart.background().enabled(false);
            var series0 = chart.area(chartData);
            series0.fill(['0 #18181b 1', '0.4 #8980d5 0.6'], 90, true);
            //chart.title("1 Day Bitcoin Wallet Chart");
            
            // set the container where chart will be drawn
            chart.container("chart-container");
            //  draw the chart on the page
            chart.draw();
        });
    });

    /*
        type CurrencyData = {
        prices: { [key: string]: { prices: number } }
    }
*/
</script>
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

<div id="chart-container" style="width: 100%; height: 300px;"></div>