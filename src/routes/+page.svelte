
<script type="ts">
  // Page
  import Portfolio from './portfolio/portfolio.svelte';
  // userDefaults store: User settings
  import { userDefaults } from '.././userDefaults';
  // userBalances store: Wallet balances
  import { userBalances } from '.././userBalances.js';
  import { selectedCurrency } from "./slides/settings-slide.svelte";

  let defaultCurrency;

  userDefaults.subscribe(value => {
    defaultCurrency = value.defaultCurrency;
  });

  let cryptoFull;
  let walletBalance;

  userBalances.subscribe(value => {
    cryptoFull = value.cryptoFull;
    walletBalance = value.walletBalance;
  });
  let selectedCur: string;
      selectedCurrency.subscribe(value => {
        selectedCur = value;
      });

</script>

<div class="h-full">
  <!-- TODO: move portfolio.svelte back, or change from +page settings-->
  <Portfolio selectedCur={selectedCur}/>
</div>