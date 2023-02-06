<script lang="ts">
  import "../app.postcss";
  // Import _layout UI components
  import TopBar from "./_layout/topbar.svelte"
  import NavBar from './_layout/navbar.svelte';

</script>
<div class="min-h-screen bg-zinc-900">
  <TopBar />
  <main class="flex-1 p-4">
    <!-- Column Layout -->
    <div class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-5 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
      <!-- Conent Left (SideBar Menu) -->
      <div class="mt-4 lg:row-span-3 lg:mt-0">
        
        <NavBar/>
      </div>

      <!-- Content Right (Yield Page Slot)-->
      <div class="lg:col-span-4 lg:border-l lg:border-zinc-800 lg:pb-16 lg:pl-8">
        <slot/>

      </div>
    </div>
    
  </main>
</div>