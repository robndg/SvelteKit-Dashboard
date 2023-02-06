<script>
 import 'anychart';
 import { onMount } from 'svelte';
 import LineChart from './components/line-chart.svelte';

 onMount(() => {

    // create a pie chart: Wallet Portfolio Share reference
    var chart = anychart.pie([
        ['USDT', 1222],
        ['LTC', 2431],
        ['BCH', 3624],
        ['BTC', 8243],
        ['ETH', 8813]
    ]);
    //chart.normal().stroke("#8980d5");
    
    chart.background().enabled(false);

    // set container id for the chart
    chart.container('pie-container');

    // initiate chart drawing
    chart.draw();

});

let data = "Data";

</script>
<div id="pie-container" style="width: 100%; height: 300px;"></div>
<!-- Wallet top earning coins + balances
    TODO: fetch coin prices, add and update coin balances from userBalances,
    tick every minute or balance onchange (receive hook, swap finish, buy completes) -->
<div class="overflow-hidden bg-zinc-800 shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-zinc-200">Market</h3>
      <p class="mt-1 max-w-2xl text-sm text-zinc-400">Your top performing coins</p>
    </div>
    <div class="border-t border-zinc-800">
      <dl>
        <div class="bg-zinc-900/90 border-t border-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 content-center">
            <dt class="text-sm font-medium text-zinc-400"><!--- mini logo -->
                  <div class="relative rounded-full py-1 px-5 text-sm text-center leading-6 text-zinc-300 ring-1 ring-zinc-100/10 hover:ring-zinc-300/20">
                      BTC <div class="font-semibold text-indigo-600">
                          Bitcoin
                      </div>
                  </div>
            </dt>
            <dd class="hidden sm:flex sm:justify-center mt-1 text-sm text-zinc-200 sm:col-span-1 sm:mt-0">
              <div class="sm:mb-1 sm:mt-2">
                  <div class="relative px-5 text-sm text-center leading-6 text-base font-semibold text-green-500">
                      + 28.5%
                  </div>
                  <div class="text-center text-zinc-300 font-light mx-auto">
                      0.3125
                  </div>
              </div>
            
            </dd>
            <dd class="mt-1 sm:col-span-1 sm:mt-0">
                  <LineChart dataTitle={"BTC"} data={ [
                    ["November", 5000],
                    ["December", 7000],
                    ["January", 5000],
                    ["February", 6000],
                    ["March", 18000],
                    ["April", 20000],
                    ["May", 22000]] 
                  }/>
            </dd>
        </div>
        <div class="bg-zinc-900/95 border-t border-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 content-center">
            <dt class="text-sm font-medium text-zinc-400"><!--- mini logo -->
                  <div class="relative rounded-full py-1 px-5 text-sm text-center leading-6 text-zinc-300 ring-1 ring-zinc-100/10 hover:ring-zinc-300/20">
                      ETH <div class="font-semibold text-indigo-600">
                          Ethereum
                      </div>
                  </div>
            </dt>
            <dd class="hidden sm:flex sm:justify-center mt-1 text-sm text-zinc-200 sm:col-span-1 sm:mt-0">
              <div class="sm:mb-1 sm:mt-2">
                  <div class="relative px-5 text-sm text-center leading-6 text-base font-semibold text-green-500">
                      + 35.3%
                  </div>
                  <div class="text-center text-zinc-300 font-light mx-auto">
                      3.5644
                  </div>
              </div>
            
            </dd>
            <dd class="mt-1 sm:col-span-1 sm:mt-0">
                  <LineChart dataTitle={"ETH"} data={ [
                    ["November", 1600],
                    ["December", 1500],
                    ["January", 1900],
                    ["February", 2300],
                    ["March", 2200],
                    ["April", 2100],
                    ["May", 2400]] 
                  }/>
            </dd>
        </div>
        <div class="bg-zinc-900/90 border-t border-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 content-center">
            <dt class="text-sm font-medium text-zinc-400"><!--- mini logo -->
                  <div class="relative rounded-full py-1 px-5 text-sm text-center leading-6 text-zinc-300 ring-1 ring-zinc-100/10 hover:ring-zinc-300/20">
                      BCH <div class="font-semibold text-indigo-600">
                          Bitcoin Cash
                      </div>
                  </div>
            </dt>
            <dd class="hidden sm:flex sm:justify-center mt-1 text-sm text-zinc-200 sm:col-span-1 sm:mt-0">
              <div class="sm:mb-1 sm:mt-2">
                  <div class="relative px-5 text-sm text-center leading-6 text-base font-semibold text-green-500">
                      + 23.5%
                  </div>
                  <div class="text-center text-zinc-300 font-light mx-auto">
                      0.1231
                  </div>
              </div>
            
            </dd>
            <dd class="mt-1 sm:col-span-1 sm:mt-0">
                  <LineChart dataTitle={"BCH"} data={ [
                    ["November", 1950],
                    ["December", 1800],
                    ["January", 2000],
                    ["February", 2600],
                    ["March", 2750],
                    ["April", 2700],
                    ["May", 2800]] 
                  }/>
            </dd>
        </div>
        <div class="bg-zinc-900/95 border-t border-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 content-center">
            <dt class="text-sm font-medium text-zinc-400"><!--- mini logo -->
                  <div class="relative rounded-full py-1 px-5 text-sm text-center leading-6 text-zinc-300 ring-1 ring-zinc-100/10 hover:ring-zinc-300/20">
                      USDT <div class="font-semibold text-indigo-600">
                          Tether
                      </div>
                  </div>
            </dt>
            <dd class="hidden sm:flex sm:justify-center mt-1 text-sm text-zinc-200 sm:col-span-1 sm:mt-0">
              <div class="sm:mb-1 sm:mt-2">
                  <div class="relative px-5 text-sm text-center leading-6 text-base font-semibold text-red-500">
                      - 0.01%
                  </div>
                  <div class="text-center text-zinc-300 font-light mx-auto">
                      5643.23
                  </div>
              </div>
            
            </dd>
            <dd class="mt-1 sm:col-span-1 sm:mt-0">
                  <LineChart dataTitle={"USDT"} data={ [
                    ["November", 0.99],
                    ["December", 1.02],
                    ["January", 0.98],
                    ["February", 1.01],
                    ["March", 1.05],
                    ["April", 0.985],
                    ["May", 1.01]] 
                  }/>
            </dd>
        </div>
        <div class="bg-zinc-900/90 border-t border-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 content-center">
            <dt class="text-sm font-medium text-zinc-400"><!--- mini logo -->
                  <div class="relative rounded-full py-1 px-5 text-sm text-center leading-6 text-zinc-300 ring-1 ring-zinc-100/10 hover:ring-zinc-300/20">
                      LTC <div class="font-semibold text-indigo-600">
                          LiteCoin
                      </div>
                  </div>
            </dt>
            <dd class="hidden sm:flex sm:justify-center mt-1 text-sm text-zinc-200 sm:col-span-1 sm:mt-0">
              <div class="sm:mb-1 sm:mt-2">
                  <div class="relative px-5 text-sm text-center leading-6 text-base font-semibold text-green-500">
                      + 54.1%
                  </div>
                  <div class="text-center text-zinc-300 font-light mx-auto">
                      32.8131
                  </div>
              </div>
            
            </dd>
            <dd class="mt-1 sm:col-span-1 sm:mt-0">
                  <LineChart dataTitle={"LTC"} data={ [
                    ["November", 65.4],
                    ["December", 70.4],
                    ["January", 80.4],
                    ["February", 64.3],
                    ["March", 75.4],
                    ["April", 86.54],
                    ["May", 108.21]] 
                  }/>
            </dd>
        </div>
        
      </dl>
    </div>
  </div>