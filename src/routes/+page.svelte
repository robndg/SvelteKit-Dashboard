
<script type="ts">
  // Page
  import Portfolio from './pages/portfolio/portfolio.svelte';
  // userDefaults store: User settings
  import { userDefaults } from '.././userDefaults';
  // userBalances store: Wallet balances
  import { userBalances } from '.././userBalances.js';

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

</script>

<div class="h-96 lg:h-full">

  <Portfolio/>
</div>