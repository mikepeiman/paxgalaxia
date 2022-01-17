<script>
	import Sketch02 from './sketch02.svelte';
	import Sketch03 from './sketch03.svelte';
	import Sketch04 from './sketch04.svelte';
	import Sketch01 from './sketch01.svelte';
	import Sketch05 from './sketch05.svelte';
	import Sketch06 from './sketch06.svelte';
	import Sketch07 from './sketch07.svelte';
	import Sketch08 from './sketch08.svelte';
	import Sketch09 from './sketch09.svelte';

	import { onMount } from 'svelte';
	export let posts;
	let canvasesResized = false
	onMount(() => {
		setTimeout(() => {
						resetCanvasSizes();
						canvasesResized=true
		}, 10);
	});

	function resetCanvasSizes() {
		let c = document.getElementsByTagName('canvas');
        console.log(`🚀 ~ file: index.svelte ~ line 21 ~ resetCanvasSizes ~ c`, c)
		for (let i = 0; i < c.length; i++) {
			let canv = c[i];
			let w = canv.parentElement.offsetWidth;
            console.log(`🚀 ~ file: index.svelte ~ line 28 ~ resetCanvasSizes ~ w`, w)
			// c[i].attributes.style.value = ""
			// c[i].attributes.removeNamedItem('style');
			// c[i].style = ""
			// c[i].attributes.style.textContent = ""
			// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 77 ~ resetCanvasSizes ~ c[i].attributes.style.value`, c[i].attributes.style.value)
			// c[i].attributeStyleMap.delete('width')
			// c[i].width = w
			// c[i].height = w
			// c[i].style.width = w
			// c[i].style.height = w
			// c[i].removeAttribute('style')
			
			// c[i].attributeStyleMap.clear()
			// c[i].setAttribute('width', w)
			// c[i].setAttribute('height', w) 
			c[i].setAttribute('style', `width: ${w}; height: ${w};`) 

			// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 76 ~ resetCanvasSizes ~ c[i].attributes.style`, c[i].attributes.style)
			// c[i].attributes.style.width = `width:${w}px;`
			// c[i].attributes.offsetWidth = w
			// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 44 ~ onMount ~ c[i].attributes.style.width`, c[i].attributes.style.width)
			// c[i].attributes.style.height = `height:${w}px;`
			// c[i].attributes.style.height = `height:${w}px;`
            // console.log(`🚀 ~ file: index.svelte ~ line 50 ~ resetCanvasSizes ~ c[i]`, c[i])
		}
	}
</script>

<svelte:head>
	<title>MetaBrain: Your Life OS</title>
</svelte:head>

<div class="title flex flex-col items-center  p-6">
	<h1>Creative coding</h1>
	<p>Sketches and animations</p>
</div>

<!-- {#await canvasesResized} -->
<div class="main justify-items-center">
	<a href="/creative/sketch01">
		<Sketch01 hidePanel="true" />
	</a>
	<a href="/creative/sketch02">
		<Sketch02 hidePanel="true" />
	</a>
	<a href="/creative/sketch03">
		<Sketch03 hidePanel="true" />
	</a>
	<a href="/creative/sketch04">
		<Sketch04 hidePanel="true" /> 
	</a>
	<a href="/creative/sketch05">
		<Sketch05 hidePanel="true" />
	</a>
	<a href="/creative/sketch06">
		<Sketch06 hidePanel="true" />
	</a>
	<a href="/creative/sketch07">
		<Sketch07 hidePanel="true" />
	</a>
	<a href="/creative/sketch08">
		<Sketch08 hidePanel="true" />
	</a>
	<a href="/creative/sketch09">
		<Sketch09 hidePanel="true" />
	</a>
</div>
<!-- {/await} -->

<style lang="scss">
	/* .title {
		grid-area: title;
	} */
	.main {
		grid-area: main;
		display: grid;
		max-width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		// :nth-child(4n + 2),
		// :nth-child(4n + 1) {
		// 	grid-column: 1 / span 1;
		// 	grid-row: 1 / span 1;
		// }
		a {
			align-self: flex-start;
		}
	}
	.pad {
		grid-area: pad;
	}
	h1 {
		font-size: 3rem;
		font-weight: 800;
	}
</style>
