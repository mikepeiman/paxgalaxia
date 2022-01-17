<script context="module">
	// import colors from '$lib/color.js'
	// console.log(`🚀 ~ file: color.svelte ~ line 4 ~ colors`, colors)
</script>

<script>
	import generate from '$lib/generate.js';
    import chroma from 'chroma-js'

	let i = 0;
	let numColors = 36;
	let hueInc = 360 / numColors;
	let hueRange = 0;
	let params = {
		specs: {
			// Number of colors
			steps: 10,
			// Hue Start Value (0 - 359)
			hue_start: hueInc * i,
			// Hue End Value (0 - 359)
			hue_end: hueInc * 1,
			// Hue Curve (See Curves Section)
			hue_curve: 'easeInQuad',
			// Saturation Start Value (0 - 100)
			sat_start: 10,
			// Saturation End Value (0 - 100)
			sat_end: 100,
			// Saturation Curve (See Curves Section)
			sat_curve: 'easeOutQuad',
			// Saturation Rate (0 - 200)
			sat_rate: 100,
			// Luminosity Start Value (0 - 100)
			lum_start: 100,
			// Luminosity End Value (0 - 100)
			lum_end: 10,
			// Luminosity Curve (See Curves Section)
			lum_curve: 'easeOutQuad',
			// Modifier Scale
			// Every generated color gets a modifier (label) that
			// indicates its lightness. A value of 10 results in
			// two-digit modifiers. The lightest color will be 0 (e.g. Red 0)
			// and the darkest color will be 100 (e.g. Red 100), given
			// that you generate 11 colors
			modifier: 10
		}
	};
	// $: params

	let hexarray_deepReds = [
		'370617',
		'6a040f',
		'9d0208',
		'd00000',
		'dc2f02',
		'e85d04',
		'f48c06',
		'faa307',
		'ffba08'
	];
	let hexarray_winterBlues = [
		'03045e',
		'023e8a',
		'0077b6',
		'0096c7',
		'00b4d8',
		'48cae4',
		'90e0ef',
		'ade8f4',
		'caf0f8'
	];
	let hexarray_limeGreens = ["002411","004b23","006400","007200","008000","38b000","70e000","9ef01a","ccff33"]

    function outputTailwindColorObjects() {
        let outputArray = []
        for (let j = 0 ; j < colorSets.length ; j++) {
            const set = colorSets[j];
            let obj = {}
            for (let z = 0; z < 9; z++) {
                obj[`${(z+1)*100}`] =  set[z]      
            }
            outputArray.push(obj)
        }
        console.log(`🚀 ~ file: color.svelte ~ line 83 ~ outputTailwindColorObjects ~ outputArray`, outputArray)
    }


	let processedArray_reds = [];
	let processedArray_blues = [];
	let processedArray_greens = [];

	let colorSets = [];
	colorSets = [hexarray_deepReds, hexarray_winterBlues, hexarray_limeGreens]
	colorSets = colorSets.map(arr => arr.map(color => `#${color}`))

	let opts = {
		provideInverted: true
	};
	let colors = generate(params);
	colors = colors.map((c) => c.hex);
	colorSets.push(colors);
	console.log(`🚀 ~ file: color.svelte ~ line 64 ~ colorSets`, colorSets);
	console.log(`🚀 ~ file: color.svelte ~ line 24 ~ colors `, colors);

    outputTailwindColorObjects()

	function generateColorSets() {
		for (i = 0; i < numColors; i++) {
			params.specs.hue_start = hueInc * i;
			console.log(
				`🚀 ~ file: color.svelte ~ line 70 ~ generateColorSets ~ params.specs.hue_start`,
				params.specs.hue_start
			);
			params.specs.hue_end = hueInc * i + hueRange;
			console.log(
				`🚀 ~ file: color.svelte ~ line 72 ~ generateColorSets ~ params.specs.hue_end`,
				params.specs.hue_end
			);
			let arr = generate(params);
			arr = arr.map((c) => c.hex);
			colorSets.push(arr);
		}
	}
	// generateColorSets();
</script>

<svelte:head>
	<title>Color Palette Generator</title>
</svelte:head>

<div class="grid grid-row">
	{#each colorSets as colorsArray}
		<div class="grid grid-col">
			{#each colorsArray as color}
				<div class="grid-item p-1 w-auto h-auto rounded-none" style="background: {color};" />
			{/each}
		</div>
	{/each}
</div>

<style>
    :root {
        --grid-tracks: 24;
        --min-w: calc(90vw / var(--grid-tracks));
        --min-h: calc(90vh / var(--grid-tracks));
    }
	.grid-col {
		grid-template-columns: repeat(var(--grid-tracks), minmax(var(--min-h), 1fr));
	}

	.grid-row {
		grid-template-rows: repeat(var(--grid-tracks), minmax(3rem, 1fr));
	}
</style>
