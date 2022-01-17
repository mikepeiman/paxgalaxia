<script>
	import '../app.scss'
	import Footer from '$components/Footer.svelte';
</script>

<div class="layout-main flex flex-col items-start jutify-start h-screen">
	<slot />
</div>
<Footer />
<style lang="scss">
	:global(#svelte) {
		min-height: 100vh;
	}
</style>
