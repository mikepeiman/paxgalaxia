<script>
	import '../app.scss'
	import Footer from '$components/Footer.svelte';
</script>

	<div id="app-layout" class="grid w-auto min-h-screen max-h-full bg-black transition">
		<div class="layout-main flex flex-col -mt-20 items-center jutify-center">
			<slot />
		</div>
		<Footer />
	</div>


<style lang="scss">
	:global(#svelte) {
		min-height: 100vh;
	}
	:global(#app-layout) {
		// height: 100vh;
		// width: 100vw;
		grid-template-rows: auto 80px;
		grid-template-columns: auto;
		grid-template-areas:
			' layout-main '
			' footer ';
	}

	:global(.layout-main) {
		grid-area: layout-main;
		max-width: 100vw;
	}
</style>
