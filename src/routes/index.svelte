<script>
	import Time from 'svelte-time';
	import { onMount } from 'svelte';
	import Sketch05 from './sketch05.svelte';
	onMount(() => {
		// resizeCanvases();
	});
	// import { collections } from '@iconify/collections';
	// console.log(`🚀 ~ file: index.svelte ~ line 18 ~ collections`, collections.fa);

	import { page } from '$app/stores';
	$: path = $page.path;
	$: console.log(`🚀 ~ file: index.svelte ~ line 24 ~ path`, path);
</script>

<div id="sketchLayout" class="flex flex-col w-full h-full relative align-center justify-center">
	<h1 class="text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[10rem]  z-10 w-full text-center font-display">MetaBrain</h1>

<div class="absolute w-screen h-screen top-0 left-0 z-0">
	
		<Sketch05 />
</div>
</div>
