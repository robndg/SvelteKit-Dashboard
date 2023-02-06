<script type="ts">
    import { page } from '$app/stores';

    // Page Nav List Details [slug, title]
    let nav_list = [
        ['/', 'Portfolio'],
        ['/market', 'Market'],
        ['/accounts', 'Accounts'],
        ['/discover', 'Discover'],
        ['/send', 'Send'],
        ['/receive', 'Receive'],
        ['/buy-sell', 'Buy / Sell'],
        ['/card', 'Card'],
        //['/my-wallet', 'My Wallet', Pencil, true, false],
    ];

    $: currentPath = $page.url.pathname;
    let activeNav = nav_list.find(item => item[0] === currentPath);

    $: {
        activeNav = nav_list.find(item => item[0] === currentPath);
        console.log(activeNav)
      
    }
</script>
<nav aria-label="Breadcrumb">
    <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-2 mb-3">
       <!-- TODO: Make breadcrumbs each, for path more one dir one slash -->

            <li>
                <div class="flex items-center">
                  <a href="/" class="mr-2 text-sm font-medium text-zinc-300">Wallet</a>
                  <!-- Replace with Icon -->
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              
              <li class="text-sm">
                <a href="{activeNav[0]}" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{activeNav[1]}</a>
              </li>

    </ol>
  </nav>