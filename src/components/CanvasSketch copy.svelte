<script context="module">
</script>

<script>
	import { canvasSketch } from 'canvas-sketch';
	import { onMount, onDestroy } from 'svelte';

	let canvas;
	let width = 500;
	let canvasLoaded = false;

	export let settings = {
		dimensions: undefined
	};

	export let data = {};
	let opt = {};
	export let sketch = () => {};

	// handle sketch loaded
	let loader, manager;
	onMount(async () => {
		opt = await {
			...settings,
			canvas,
			parent: canvas.parentElement,
			data
		};
		canvasLoaded = true;
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 24 ~ onMount ~ opt`, opt)
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 24 ~ onMount ~ opt.parent`, opt.parent)
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 26 ~ onMount ~ parent`, parent)
		loader = await canvasSketch(sketch, opt);
		manager = await loader;
	});

	$: {
		if (opt.parent?.offsetWidth > 0) {
			width = opt.parent?.offsetWidth;
			console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 39 ~ width`, width);
		}
	}

	$: console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 46 ~ settings`, settings);
	$: console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 46 ~ settings`, settings.animate);
	$: (settings) => delete settings.animate;
	// handle sketch destroy
	// onDestroy(() => {
	// 	loader.then(m => m.destroy());
	// 	loader = null;
	// 	manager = null;
	// });

	// update settings and data
	$: manager && manager.update(settings);
	// $: loader && loader.update(settings)
	$: dataChanged(data);
	// $: console.log(this)
	// $: console.log(canvas)

	function dataChanged(data) {
		if (manager) {
			Object.assign(manager.props.data, data);
			manager.render();
		}
	}
</script>

<canvas bind:this={canvas} style={`width: ${width}px`} />

<style>
	/* Optionally style the canvas here */
	canvas {
		margin: auto;
		display: block;
		box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.15);
		width: 100%;
		/* width: inherit; */
		/* min-width: inherit; */
		height: auto;
	}
</style>
