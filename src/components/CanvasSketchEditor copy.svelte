<script>
	import CanvasSketch from './CanvasSketch.svelte';

	export let settings = {};
	export let data = {};
	export let sketch = () => {};
	export let hidePanel = false;
	let localStorageSupported = (() => {
		try {
			return typeof window.localStorage !== 'undefined';
		} catch (err) {
			return false;
		}
	})();

	// None of this will work in the sandbox REPL but it will work offline
	// saveData(settings, data)

	import { page } from '$app/stores';
	$: path = $page.url.pathname;
	readData(settings, data);
	$: saveData(settings, data);


	function saveData(settings, data) {
		if (localStorageSupported && settings.localStorage !== false) {
			window.localStorage.setItem(`${data.TITLE}`, JSON.stringify(data));
		}
	}

	function readData(settings, data) {
		if (localStorageSupported && settings.localStorage !== false) {
			try {
				const prev = window.localStorage.getItem(`${data.TITLE}`);
				if (!prev) return;
				const newData = JSON.parse(prev);
				Object.assign(data, newData);
			} catch (err) {
				console.warn(err);
			}
		}
	}


</script>

<main class="sketch" class:preview={'/creative' === path}>
	{#if '/creative' === path}
		<div class="title flex items-center justify-center flex w-full self-center">
			<h1 class="text-2xl text-center text-sky-200 mt-6 w-full self-center">{data.TITLE}</h1>
		</div>
	{/if}
	<div class="viewport">
		<CanvasSketch {data} {settings} {sketch} />
	</div>

	{#if !hidePanel}
		<div class="panel">
			<slot />
		</div>
	{/if}
</main>

<style lang="scss">
	/* :global(body) {
		margin: 0;
		padding: 0;
	} */

	main {
		// ORIGINAL STYLES
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		// ADDED
		grid-area: main;
		&.preview {
			grid-area: none;
			width: 100%;
			height: 100%;
			display: grid;
			grid-template-rows: 3rem 16rem;
			grid-template-areas:
				'sketch-title'
				'sketch-canvas';
			justify-content: center;
			align-items: center;
			flex-direction: row;
		}
	}
	.title {
		grid-area: sketch-title;
		// width: 300px;
	}
	.sketch {
		/* width: auto;
		grid-row: sketch-start; */
	}
	.viewport {
		grid-area: sketch-canvas;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		flex-basis: 60%;
		min-width: 200px;
		flex-grow: 1;
		flex-shrink: 1;
	}
	.panel {
		padding: 20px;
		box-sizing: border-box;
		flex-basis: 300px;
		min-width: 200px;
		max-width: 400px;
		flex-grow: 1;
		flex-shrink: 1;
		height: 100%;
		background: hsl(0, 0%, 95%);
		border-left: 1px solid hsl(0, 0%, 90%);
		overflow-y: scroll;
	}
</style>
