<script>
	import Footer from '$components/Footer.svelte';
	import SideNav from '$components/SideNav.svelte';
	import '../app.scss';
	import Nav from '../components/Nav.svelte';
	import { page } from '$app/stores';
	$: path = $page.path;
	$: console.log(`🚀 ~ file: index.svelte ~ line 24 ~ path`, path);
	$: console.log(
		`🚀 ~ file: index.svelte ~ line 24 ~ path includes blog : `,
		path.includes('blog')
	);
</script>

{#if path.includes('blog')}
	<div class="blog bg-gray-900 min-h-screen height-full flex flex-col items-center jutify-start">
		<slot />
	</div>
	<div class="">
		<Footer textColor="text-gray-900" />
	</div>
<!-- {:else if path.includes('creative') && path.split('/').length > 2}
	<div class="layout-main flex flex-col items-center jutify-center">
		<slot />
	</div>
	<Footer /> -->
{:else if path.includes('creative')}
		<div class="flex flex-col h-screen">
			<div class="layout-creative flex flex-col h-full items-start jutify-start">
				<slot />
			</div>
			<Footer />
		</div>
{:else if path !== '/' && !path.includes('egghead-discord')}
	<div id="app-layout" class="grid w-auto min-h-screen max-h-full bg-black transition">
		<Nav>
			<slot />
		</Nav>
		<div class="layout-main flex flex-col items-start jutify-start">
			<slot />
		</div>
		<Footer />
	</div>
{:else if path === '/'}
	<div id="app-layout" class="grid w-auto min-h-screen max-h-full bg-black transition">
		<div class="layout-main flex flex-col -mt-20 items-center jutify-center">
			<slot />
		</div>
		<Footer />
	</div>
{:else}
	<div class="layout-main flex flex-col items-start jutify-start h-screen">
		<slot />
	</div>
{/if}

<style lang="scss">
	:global(#svelte) {
		min-height: 100vh;
	}
	:global(#app-layout) {
		// height: 100vh;
		// width: 100vw;
		grid-template-rows: 5rem auto 80px;
		grid-template-columns: auto;
		grid-template-areas:
			' header '
			' layout-main '
			' footer ';
	}

	:global(.layout-main) {
		grid-area: layout-main;
		max-width: 100vw;
	}
	:global(.layout-creative) {
		grid-area: layout-main;
		max-width: 100vw;
	}

	.header {
		grid-area: header;
	}

	.sidebar {
		grid-area: sidebar;
	}

	.center {
		--gap: 1rem;
		--mw: 50rem;

		width: 100%;
		max-width: var(--mw);
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--gap);
		padding-right: var(--gap);
	}
</style>
