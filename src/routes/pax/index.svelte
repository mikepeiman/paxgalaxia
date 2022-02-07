<script>
	// import onMoun
	import { onMount } from 'svelte';
	let w, h, canvas, ctx, cx, cy, theta = 0;
	$: console.log(w, h);
	$: w, h;
	$: cx = w / 2;
	$: cy = h / 2;
	let mounted = false;
	// initialize context 2d

	let radius = Math.min(w, h) / 4;

	onMount(() => {
		mounted = true;
		init();
	});
	function onClick() {
		console.log('click');
		drawDot();
	}

	function init() {
		canvas = document.getElementById('canvas');
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;
		cx = w / 2;
		cy = h / 2;
		radius = Math.min(w, h) / 4;
		canvas.style.backgroundColor = '#000';
		canvas.style.cursor = 'pointer';
		ctx = canvas.getContext('2d');
		ctx.fillRect(0, 0, w, h);
		canvas.addEventListener('click', onClick);
		draw();
	}

	function drawDot() {
		theta = theta + Math.PI / 100;
        console.log(`🚀 ~ file: index.svelte ~ line 40 ~ drawDot ~ Math.PI / 100`, Math.PI / 100)
        console.log(`🚀 ~ file: index.svelte ~ line 40 ~ drawDot ~ theta`, theta)
		let x = cx + radius * Math.cos(theta);
		let y = cy + radius * Math.sin(theta);
		ctx.beginPath();
		ctx.arc(x, y, 40, 0, 2 * Math.PI);
		ctx.fillStyle = '#22f';
		ctx.fill();
	}

	function draw() {
		ctx.strokeStyle = '#fff';

		// ctx.beginPath();
		// ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
		// console.log(`🚀 ~ file: index.svelte ~ line 30 ~ draw ~ cx, cy, radius`, cx, cy, radius);
		// ctx.stroke();
		// draw a dot that orbits the center
		ctx.beginPath();
		ctx.arc(cx, cy, radius / 4, 0, 2 * Math.PI);
		ctx.fillStyle = '#fff';
		ctx.fill();

		// animate()
		// canvas;
		// console.log(`🚀 ~ file: index.svelte ~ line 26 ~ draw ~ canvas`, canvas);
	}
	// animate the circle
	function animate() {
		requestAnimationFrame(animate);
		drawDot();
	}
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<canvas id="canvas" bind:this={canvas} />
