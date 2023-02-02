<script>
  import "../app.postcss";
  // Import _layout UI components
  import TopBar from "../routes/_layout/topbar.svelte"
</script>
<div class="min-h-full">
  <TopBar/>
  <slot />
</div>