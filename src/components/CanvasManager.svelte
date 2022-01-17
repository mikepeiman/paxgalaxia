<script>
	import CanvasSketch from './CanvasSketch.svelte';

	export let settings = {};
	export let data = {};
	export let hidePanel = false;
	let viewportW, viewportH
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

	{#if !hidePanel}

			<slot />

	{/if}

<style lang="scss">
	.panel {

	}
</style>
