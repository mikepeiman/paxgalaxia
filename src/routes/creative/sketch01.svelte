<!-- Code copied gratefully from Matt DesLaurier's excellent Svelte REPL at
https://svelte.dev/repl/5ab538b7182941f789908a660e9bd25c?version=3.12.1

Leaving his example as the first sketch here in honor of his work and amazing contributions -->

<script>
	export let hidePanel = false
	import CanvasSketchEditor from '$components/CanvasSketchEditor.svelte';
	import Slider from '$components/Slider.svelte';
	import ColorInput from '$components/ColorInput.svelte';
	import Checkbox from '$components/Checkbox-import.svelte';

	const data = {
		TITLE: "Sketch01",
		outline: true,
		arclen: 0.5,
		angle: 0,
		radius: 0.33,
		background: '#527A9B',
		foreground: '#F4B9A7',
		lineWidth: 20
	};
	
	const settings = {
		scaleToView: true,
		scaleToFit: true,
		resizeCanvas: true,
		scaleContext: true,
		dimensions: [ 1280, 1280 ]
	};
	
	const sketch = ({}) => {
		return ({ context, width, height }) => {
			const {
				background,
				foreground,
				radius,
				arclen,
				angle,
				lineWidth,
				outline,
				stroke
			} = data;
			context.clearRect(0, 0, width, height);
			context.fillStyle = background;
			context.fillRect(0, 0, width, height);
			
			const minDim = Math.min(width, height);
			context.beginPath();
			context.arc(
				width / 2,
				height / 2,
				minDim * radius,
				angle,
				Math.PI * 2 * arclen + angle
			);
			context.fillStyle = foreground;
			context.strokeStyle = foreground;
			context.lineWidth = lineWidth;
			if (outline) context.stroke();
			else context.fill();
		};
	};
</script>


<CanvasSketchEditor {sketch} {settings} {data} {hidePanel} >
	<ColorInput label='Background' bind:value={data.background} />
	<ColorInput label='Foreground' bind:value={data.foreground} />
	<Slider label='Arc Length' bind:value={data.arclen}  min=0.05 max=1 step=0.05 />
	<Slider label='Radius' bind:value={data.radius} min=0.05 max=1 step=0.05 />
	<Slider label='Angle' bind:value={data.angle} min={0} max={Math.PI * 2 + .1 } step=0.1/>
	<Checkbox label='Outline' bind:checked={data.outline} />
	{#if data.outline}
		<Slider label='Line Width' bind:value={data.lineWidth} min=1 max=100 />
	{/if}
</CanvasSketchEditor>

<style>
	.sketch {
		/* grid-area: sketch-canvas; */
		/* width: auto;
		height: auto; */
	}
</style>