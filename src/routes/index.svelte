<script>
	// import Time from 'svelte-time';
	import { onMount } from 'svelte';
	import Sketch05 from './sketch05.svelte';
	// let mounted = false;
	// onMount(() => {
	// 	mounted = true;
	// });
</script>

<!-- {#if mounted} -->
<div class="flex flex-col w-screen h-screen relative align-center justify-center ">
	<div class="flex flex-col z-10 w-full h-full align-center justify-center text-center">
		<h1 class="text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-display">MetaBrain</h1>
		<div
			class="flex flex-col py-8 my-4 w-full bg-black bg-opacity-25 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-montserrat"
		>
			<h2 class="p-2">One app to rule them all, one app to unite them;</h2>
			<h2 class="p-2">One app to knowledge graph, to learn and track a lifetime.</h2>
		</div>
	</div>
	<div class="absolute w-screen h-screen top-0 left-0 z-0">
		<Sketch05 />
	</div>
</div>
<!-- {/if} -->
<!-- 
<style global lang="scss">
body {
	background: #222;
}
</style> -->
