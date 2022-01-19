<script>
	import '../app.scss';
	import Footer from '$components/Footer.svelte';
</script>

<div id="app-layout" class="grid w-full min-h-screen   transition">
	<div class="layout-main  flex flex-col  items-center jutify-center">
		<slot />
	</div>
	<!-- <div class="relative z-20"> -->
		<Footer />
	<!-- </div> -->
</div>

<style global lang="scss">
	:global(#svelte) {
		min-height: 100vh;
		// height: 100%;
		// background: var(--color-deepreds-600);
		// height: calc(100% - 80px);
	}
	:global(#app-layout) {
		// height: calc(100vh - 160px);
		// height: 100%;
		// width: 100%;
		// width: 100vw;
		grid-template-rows: auto 80px;
		grid-template-columns: auto;
		grid-template-areas:
			' layout-main '
			' footer ';
	}

	:global(.layout-main) {
		grid-area: layout-main;
		// max-width: 100vw;
		// height: calc(100% - 80px);
	}
	// :root {
	// 	background-color: red;
	// 	height: 100vh;
	// }
	html {
		max-width: 100vw;
		width: 100%;
		// height: 100%;
		// background-color: pink;
	}

	body {
		// min-height: 100vh;
		margin: 0;
		// background-color: darkturquoise;
		height: 90%;
	}
</style>
