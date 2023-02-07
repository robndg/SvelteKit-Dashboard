<script>
    import {
      Icon,
      ChevronLeft,
      ChevronRight
    } from "svelte-hero-icons";
    // Demo content array of transaction items
    const tranEntries = [
        {action: "Sent", coinName: "Bitcoin", amount: 0.5, USDValue: 35000, status: "Completed", time: 1644608000000},
        {action: "Exchange", coinName: "Litecoin", amount: 10, USDValue: 1200, status: "Pending", time: 1643622400000},
        {action: "Sent", coinName: "Bitcoin Cash", amount: 1, USDValue: 6000, status: "Completed", time: 1635590400000},
        {action: "Received", coinName: "Ripple", amount: 25, USDValue: 5000, status: "Confirmed", time: 1624960000000},
        {action: "Exchange", coinName: "Cardano", amount: 50, USDValue: 2500, status: "Pending", time: 1617238400000},
        {action: "Sent", coinName: "Ethereum Classic", amount: 2, USDValue: 400, status: "Completed", time: 1609529600000},
        {action: "Received", coinName: "Binance Coin", amount: 100, USDValue: 15000, status: "Confirmed", time: 1622809600000},
        {action: "Exchange", coinName: "Chainlink", amount: 5, USDValue: 5000, status: "Pending", time: 1622723200000},
        {action: "Sent", coinName: "Dogecoin", amount: 1000, USDValue: 500, status: "Completed", time: 1622636800000},
        {action: "Received", coinName: "Polkadot", amount: 10, USDValue: 5000, status: "Confirmed", time: 1622550400000},
        {action: "Exchange", coinName: "Uniswap", amount: 20, USDValue: 6000, status: "Pending", time: 1622464000000},
        {action: "Sent", coinName: "Stellar", amount: 5, USDValue: 1000, status: "Completed", time: 1622377600000},
        {action: "Received", coinName: "Aave", amount: 100, USDValue: 10000, status: "Confirmed", time: 1622291200000},
        {action: "Exchange", coinName: "Yearn Finance", amount: 2, USDValue: 25000, status: "Pending", time: 1622204800000},
        {action: "Sent", coinName: "Synthetix", amount: 20, USDValue: 5000, status: "Completed", time: 1622118400000},
        {action: "Received", coinName: "Compound", amount: 50, USDValue: 15000, status: "Confirmed", time: 1622032000000},
        {action: "Exchange", coinName: "0x", amount: 10, USDValue: 2000, status: "Pending", time: 1621941600000},
    ];

    let currentPage = 1;
    let itemsPerPage = 10;
    let items = tranEntries; 
    let totalPages = Math.ceil(items.length / itemsPerPage);
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    
    function goToPage(page) {
        currentPage = page;
    }

    function prevPage() {
        if (currentPage > 1) {
        currentPage--;
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
        currentPage++;
        }
    }
</script>

<!-- Transactions log -->
<div class="relative overflow-x-auto rounded-md">
    <table class="w-full text-sm text-left text-zinc-200">
        <thead class="text-xs text-zinc-200 uppercase bg-zinc-700">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
                <th scope="col" class="px-6 py-3">
                    Coin
                </th>
                <th scope="col" class="px-6 py-3">
                    Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
            </tr>
        </thead>
        <tbody>
            {#each tranEntries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                as entry}
            <tr class="bg-zinc-800/70 border-b border-zinc-800 text-zinc-200 hover:bg-zinc-900">
                <th scope="row" class="px-6 py-4 font-medium text-zinc-200 whitespace-nowrap">
                    {entry.action}
                </th>
                <td class="px-6 py-4">
                    {entry.coinName}
                </td>
                <td class="px-6 py-4">
                    {entry.amount}
                </td>
                <td class="px-6 py-4">
                    {entry.status}
                </td>
                <td class="px-6 py-4">
                    {new Date(entry.time).toLocaleDateString()}
                </td>
            </tr>
            {/each}
           
        </tbody>
    </table>

    <!-- Paginate (10 items)-->
    <div class="flex items-center justify-between border-t border-zinc-800 bg-zinc-800 px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900" on:click={prevPage}>Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900" on:click={nextPage}>Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
            <p class="text-sm text-zinc-300">
                Showing
                <span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                to
                <span class="font-medium">{Math.min((currentPage) * itemsPerPage, items.length)}</span>
                of
                <span class="font-medium">{items.length}</span>
                results
            </p>
            </div>
            <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center rounded-l-md border border-zinc-700 bg-zinc-800 px-2 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 focus:z-20" 
                    on:click={prevPage}>
                        <span class="sr-only">Previous</span>
                        <!-- Heroicon name: chevron-left -->
                        <Icon src="{ChevronLeft}" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    </a>
                    {#each pages as page}
                    <a href="#" 
                        class="relative inline-flex items-center border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 focus:z-20 {page === currentPage ? "font-bold" : "font-thin"} "
                        class:aria-current={page === currentPage ? "page" : ""} on:click={() => goToPage(page)}
                        >
                        {page}
                    </a>
                    {/each}
                    <a href="#" class="relative inline-flex items-center rounded-r-md border border-zinc-700 bg-zinc-800 px-2 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 focus:z-20"
                        on:click={nextPage}>
                        <span class="sr-only">Next</span>
                        <!-- Heroicon name: hevron-right -->
                        <Icon src="{ChevronRight}" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    </a>
                </nav>


            </div>
        </div>
    </div>
</div>