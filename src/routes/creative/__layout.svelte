<script>
	import Footer from '$components/Footer.svelte';
	import SideNav from '$components/SideNav.svelte';
	import '../../app.scss';
	import Nav from '$components/Nav.svelte';
	import { page } from '$app/stores';
	$: params = $page.params;
	$: path = $page.path;
	$: path;
	$: console.log(`🚀 ~ file: __layout.svelte ~ line 10 ~ path`, path.split('/').length);
	$: console.log(`🚀 ~ file: __layout.svelte ~ line 9 ~ params`, params);
</script>

{#if path.split('/').length > 2}
	<div id="sketchLayout" class="w-full max-w-screen h-full">
		<SideNav class="sidebar">
			<slot class="sidebar" />
		</SideNav>
		<slot class="sketch" />
	</div>
{:else}
	<div id="creative-layout">
		<SideNav class="sidebar">
			<slot class="sidebar" />
		</SideNav>
		<div class="flex w-auto h-full">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	:global(#creative-layout) {
		grid-template-rows: auto 1fr;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			'sidebar title'
			'sidebar main';
	}

	:global(#sketchLayout) {
		display: grid;
		grid-area: layout-main;
		grid-template-columns: 10rem 1fr;
		grid-template-areas: 'sidebar sketch';
		max-height: calc(100vh - 80px);
		max-width: 100vw;
	}
	:global(.sketch) {
		grid-area: sketch;
		display: grid;
		grid-template-areas: 'canvas controls';
		grid-template-columns: 1fr minmax(20rem, 25rem);
	}
	.main {
		justify-content: center;
		align-items: center;
		grid-area: main;
		display: grid;
		height: auto;
		grid-template-columns: 60vw;
		grid-template-rows: 10rem auto;
		grid-template-areas:
			'title'
			'body';
	}

	.header {
		grid-area: header;
	}

	.sidebar {
		grid-area: sidebar;
	}
</style>
