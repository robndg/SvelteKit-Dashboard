<script>
    import { page } from '$app/stores';
    import {
      Icon,
      PresentationChartLine,
      ChartBar,
      CurrencyDollar,
      CheckCircle,
     // Squares2X2Icon,
      ArrowUp,
      ArrowDown,
      //ArrowPathRounded,
      ViewList,
      CreditCard,
      Pencil,
      Clock, Check
    } from "svelte-hero-icons";
    import { fade, scale } from 'svelte/transition'; // For page update notif's

    // Page Nav List Details [slug, title, icon, disabled, progress]
    let nav_list = [
        ['/', 'Portfolio', PresentationChartLine, false, false],
        ['/market', 'Market', ChartBar, true, false],
        ['/accounts', 'Accounts', ViewList, true, false],
        //['/discover', 'Discover', CheckCircle, true, false],
        ['/send', 'Send', ArrowUp, true, false],
        ['/receive', 'Receive', ArrowDown, true, false],
        //['/buy-sell', 'Buy / Sell', CurrencyDollar, true, true],
        ['/card', 'Card', CreditCard, true, false],
        //['/my-wallet', 'My Wallet', Pencil, true, false],
    ];
    const menu_list = nav_list.map((menu, index) => ({
        slug: menu[0], // TODO: Use a 'slugify' function on title instead
        title: menu[1],
        icon: menu[2],
        disabled: menu[3],
        progress: menu[4], // TODO: make page in progress (ie. transaction pending) reactive
        index: index
    }));
    const menuCount = menu_list.length;
    console.log($page.url.pathname)
</script>

<fieldset class="mt-4 mb-4">
    <legend class="sr-only">Your Coin Management Pages</legend>
    <div class="grid grid-cols-1 gap-4 grid-cols-3 sm:grid-cols-6 lg:grid-cols-1"> <!-- Dynamically update list style if nav_list changes-->
      <!-- Active: "bg-zinc-800 border-indigo-500 text-zinc-200" 
        Inactive: "bg-zinc-900 focus:bg-zinc-800 hover:bg-zinc-800 border-zinc-600 focus:border-indigo-500 text-zinc-400 hover:text-gray-100" 
        Disabled: "cursor-not-allowed"-->
      {#each menu_list as menu}
     
      <a href="{menu.slug.toString()}" class="group relative border {$page.url.pathname == menu.slug ? 'bg-zinc-800 border-indigo-500 text-zinc-200' : 'bg-zinc-900 focus:bg-zinc-800 hover:bg-zinc-800 border-zinc-600 focus:border-indigo-500 text-zinc-300 hover:text-gray-100'} rounded-md flex items-center justify-center text-sm font-medium uppercase flex-1 md:flex-1 py-2 lg:py-3 px-4 
        {menu.disabled == true ? 'cursor-not-allowed' : ''}">
        <Icon src="{menu.icon}" class="absolute ml-0 sm:mx-auto lg:ml-3 flex-shrink-0 inset-0 h-full h:lg-5 w-10 lg:w-5 stroke-2 text-zinc-600 pointer-events-none" aria-hidden="true" />
        <span id="menu-{menu.index}-label" class="invisible md:invisible lg:visible">{menu.title}</span> 
        {#if menu.progress}
            <Icon src="{Check}" class="absolute mr-2.5 ml-auto h:lg-5 w-10 lg:w-5 flex-shrink-0 inset-0 h-full w-full md:w-5 stroke-2 text-indigo-500 
            invisible lg:visible" aria-hidden="true" />
        {/if}
      </a>

      {/each}
    </div>
  </fieldset>