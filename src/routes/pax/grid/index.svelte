<script>
	// import components
	import CanvasManager from '$components/CanvasManager.svelte';
	import Slider from '$components/Slider.svelte';
	import Checkbox from '$components/Checkbox-import.svelte';
	import OptionSelect from '$components/OptionSelect.svelte';
	import { onMount } from 'svelte';
	// import Grid from '../grid.svelte';
	import { defineGrid, extendHex } from 'honeycomb-grid';
	import Button from '$components/Button.svelte';

	let w,
		h,
		canvas,
		ctx,
		cx,
		cy,
		stars = [],
		theta = 0,
		frame = 0,
		alpha = 0,
		modAlpha = 1;
	$: console.log(w, h);
	$: w, h;
	$: cx = w / 2;
	$: cy = h / 2;
	let mounted = false,
		animating = false;
	let counter = 0;
	let radius = Math.min(w, h) / 4;
	let data = {
		TITLE: 'Pax01-vanilla',
		fps: 60,
		numStars: 60,
		numTypes: 5,
		shipsMin: 1,
		shipsMax: 50,
		starRadius: 20,
		gridRadius: 55,
		gridOffset: 0,
		orbitXmod: 1,
		orbitYmod: 1,
		speed: 10,
		clearLS: false,
		drawCenters: true,
		drawHexes: true,
		drawVerticies: false,
		buildVertexes: false
	};
	let hexCenterCoords = [];
	let hexVertexCoords = [];
	let uniqueVertexCoords = [];

	onMount(async () => {
		mounted = true;
		w = canvas.width = window.innerWidth * 0.8;
		h = canvas.height = window.innerHeight;
		canvasInit();
		mapInit(data.drawCenters, data.drawHexes, data.buildVertexes);
		console.log(`🚀 ~ file: index.svelte ~ line 52 ~ onMount ~ stars`, stars);
	});

	function canvasInit() {
		canvas = document.getElementById('canvas');
		w = canvas.width = window.innerWidth * 0.8;
		h = canvas.height = window.innerHeight;
		canvas.style.backgroundColor = '#222';
		canvas.style.cursor = 'pointer';
		ctx = canvas.getContext('2d');
		ctx.fillStyle = '#222';
		ctx.fillRect(0, 0, w, h);
		canvas.addEventListener('click', onClick);
	}

	async function mapInit(center, outline, vertexes) {
		generateHexGrid(w, h, data.gridRadius, data.gridOffset);
		if (vertexes) {
			getVertexCoords();
			uniqueVertexCoords = removeDuplicates(hexVertexCoords);
		}
		// drawOnHexCoords(true, true, true);
		// drawOnHexCoords(true, false, true);
		drawOnHexCoords(center, outline, vertexes);
		stars = generateStars(data.numStars);
		stars.forEach((star) => {
			draw(star);
		});
	}

	function getVertexCoords() {
		hexCenterCoords.forEach((coord) => {
			const a = (2 * Math.PI) / 6;
			for (let i = 0; i <= 6; i++) {
				const x = roundNum(coord.x + coord.r * Math.cos(a * i), 3);
				const y = roundNum(coord.y + coord.r * Math.sin(a * i), 3);
				hexVertexCoords = [...hexVertexCoords, { x, y }];
			}
		});
	}

	function drawHex(cx, cy, r) {
		const a = (2 * Math.PI) / 6;
		ctx.beginPath();
		ctx.strokeStyle = `hsla(${Math.random() * (cx + cy)}, 100%, 50%, 1)`;

		for (let i = 0; i <= 6; i++) {
			const x = roundNum(cx + r * Math.cos(a * i), 3);
			const y = roundNum(cy + r * Math.sin(a * i), 3);
			ctx.lineTo(x, y);
		}
		ctx.stroke();
	}

	const removeDuplicates = (objArray) => {
		const flag = {};
		const unique = [];
		objArray.forEach((obj) => {
			if (!flag[obj.x + ':' + obj.y]) {
				flag[obj.x + ':' + obj.y] = true;
				unique.push(obj);
			}
		});
		console.log(`🚀 ~ file: index.svelte ~ line 105 ~ objArray.forEach ~ unique`, unique);
		console.log(`🚀 ~ file: index.svelte ~ line 82 ~ removeDuplicates ~ flag`, flag);
		return unique;
	};

	function roundNum(num, places) {
		const x = Math.pow(10, places);
		return Math.round(num * x) / x;
	}

	function generateHexGrid(width, height, r, offset = 0) {
		const a = (2 * Math.PI) / 6;
		let max = 0;
		let evenTest = 1;
		let even = false;
		for (let y = r; y + r * Math.sin(a) < height; y += offset + evenTest * (r * Math.sin(a))) {
			for (
				let x = r, j = 0;
				x + r * (1 + Math.cos(a)) < width;
				x += offset + r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)
			) {
				j >= max ? (max = j + 1) : (max = max);
				x = roundNum(x, 3);
				y = parseFloat(y.toFixed(3));
				hexCenterCoords = [...hexCenterCoords, { x, y, r }];
			}
			max % 2 === 0 ? (even = true) : (even = false);
			even ? (evenTest = 2) : (evenTest = 1);
		}
		console.log(`🚀 ~ file: index.svelte ~ line 69 ~ drawHex ~ hexCoords`, hexCenterCoords);
	}

	function drawOnHexCoords(center, outline, vertexes) {
		let i = 0;
		hexCenterCoords.forEach((hex) => {
			if (center) {
				ctx.beginPath();
				ctx.fillStyle = `hsla(${i++}, 100%, 50%, 1)`;
				ctx.arc(hex.x, hex.y, 5, 0, 2 * Math.PI);
				ctx.fill();
			}
			if (outline) {
				drawHex(hex.x, hex.y, hex.r);
			}
		});
		if (vertexes) {
			uniqueVertexCoords.forEach((vertex, i) => {
				drawHex(vertex.x, vertex.y, 5);
			});
		}
	}

	function onClick() {
		console.log('click');
		// drawDot();
		animating ? (animating = false) : (animating = true);
		animating ? animate() : null;
	}

	function reset() {
		// data.clearLS = true
		init();
	}

	// write a function that generates stars using random coordinates from hexCenterCoords
	function generateStars(num) {
		stars = [];
		const flag = {};
		for (let i = 0; i < num; i++) {
			let coords = hexCenterCoords[Math.floor(Math.random() * hexCenterCoords.length)];
			if (!flag[coords.x + ':' + coords.y]) {
				flag[coords.x + ':' + coords.y] = true;
				let star = new Star(
					coords.x,
					coords.y,
					Math.random() * 5 + data.starRadius,
					Math.floor(Math.random() * data.numTypes) * (360 / data.numTypes),
					Math.random() * data.shipsMax
				);
				star['ships'] = generateShips(star);
				stars = [...stars, star];
			} else {
				console.log(`🚀 ~ file: index.svelte ~ line 214 ~ generateStars ~ else`);
				i--;
			}
		}
		return stars;
	}

	function shuffle(o) {
		//try this shuffle function
		for (
			var j, g, t = o.length;
			t;
			j = Math.floor(Math.random() * t), g = o[--t], o[t] = o[j], o[j] = g
		);
		return o;
	}

	function generateShips(star) {
		// console.log(`🚀 ~ file: index.svelte ~ line 76 ~ generateShips ~ star`, star);
		let ships = [];
		for (let i = 0; i < star.numShips; i++) {
			let color = `hsla(${star.hue + Math.random() * i}, ${
				Math.random > 0.5 ? 50 + Math.random() * i * 5 : 50 - Math.random() * i
			}%, ${Math.random > 0.5 ? 75 + Math.random() * i * 5 : 50 - Math.random() * i}%, ${
				Math.random > 0.75 ? Math.random() + 0.25 : Math.random() - 0.25
			})`;
			let ship = new Ship(Math.random() * 5, color, Math.random() * 5);
			// console.log(`🚀 ~ file: index.svelte ~ line 79 ~ generateShips ~ ship`, ship);
			ships = [...ships, ship];
		}
		star.ships = ships;
		return ships;
	}

	function drawShips(star) {
		// console.log(`🚀 ~ file: index.svelte ~ line 87 ~ drawShips ~ star`, star);
		let x = 1,
			y = 1;
		let ships = star.ships;
		// console.log(`🚀 ~ file: index.svelte ~ line 86 ~ drawShips ~ ships`, ships);
		star['ships'].forEach((ship, i) => {
			theta = theta + ((i / 10000) * data.speed) / 500;
			x = star.x + (star.radius + 10) * Math.cos(theta + i / data.orbitXmod); // adjustments to theta, like using i only on x or y, or i / 2, gives different results
			y = star.y + (star.radius + 10) * Math.sin(theta + i / data.orbitYmod);
			ctx.beginPath();
			ctx.arc(x, y, 4, 0, 2 * Math.PI);
			ctx.fillStyle = ship.color;
			ctx.fill();
		});
	}

	function bounceAlpha() {
		alpha >= 1 ? (modAlpha = -1) : null;
		alpha <= 0 ? (modAlpha = 1) : null;
		let inc = 0.007 * modAlpha;
		// console.log(`🚀 ~ file: index.svelte ~ line 67 ~ bounceAlpha ~ inc`, inc)
		alpha += inc;

		return alpha.toFixed(3);
	}

	function draw(star) {
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
		ctx.fillStyle = `hsla(${star.hue}, 50%, 50%, 1)`;
		ctx.fill();
	}
	// animate the circle
	function animate() {
		counter++;

		if (stars.length < data.numStars) {
			stars = [...stars, ...generateStars(data.numStars - stars.length)];
		}
		if (animating) {
			//  && counter < 10
			setTimeout(function () {
				requestAnimationFrame(animate);
				ctx.fillStyle = '#222';
				ctx.fillRect(0, 0, w, h);
				ctx.save();
				stars.forEach((star) => {
					draw(star);
					drawShips(star);
				});
				// drawGrid();
				// ctx.clearRect(0, 0, w, h);
				ctx.restore();
				// ctx.fillRect(0,0,w,h);
				++frame;
			}, 1000 / data.fps);
		} else {
			return;
			// init();
		}
	}

	class Vector {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	}
	class Star {
		constructor(x, y, radius, hue, numShips) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.hue = hue;
			this.numShips = numShips;
		}
	}

	class Ship {
		constructor(radius, color, orbit) {
			this.radius = radius;
			this.color = color;
			this.orbit = orbit;
		}
	}
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<!-- <Grid /> -->
<div class="sketch-wrapper">
	<canvas id="canvas" bind:this={canvas} />
	<div class="controls flex flex-col p-5">
		<CanvasManager {data}>
			<Slider label="Number of stars" bind:value={data.numStars} min="1" max="50" step="1" />
			<Slider label="Ships min" bind:value={data.shipsMin} min="1" max="50" step="1" />
			<Slider label="Ships max" bind:value={data.shipsMax} min="5" max="250" step="5" />
			<Slider label="Speed" bind:value={data.speed} min="5" max="100" step="5" />
			<Slider label="FPS" bind:value={data.fps} min="1" max="60" step="1" />
			<Slider label="Orbit X mod" bind:value={data.orbitXmod} min=".1" max="5" step=".1" />
			<Slider label="Orbit Y mod" bind:value={data.orbitYmod} min=".1" max="5" step=".1" />
			<button label="Start" class="p-3 bg-sky-600 hover:bg-sky-500 rounded" on:click={onClick}
				>Animate</button
			>
			<button label="Start" class="p-3 bg-sky-600 hover:bg-sky-500 rounded" on:click={mapInit}
				>Clear localStorage</button
			>
			<Checkbox duration="200" label="Random color functions?" bind:checked={data.randomColors} />
			<Checkbox duration="200" label="Draw Centers" bind:checked={data.drawCenters} />
			<Checkbox duration="200" label="Draw Hexes" bind:checked={data.drawHexes} />
			<Checkbox duration="200" label="Draw Vertices" bind:checked={data.drawVertices} />
			<OptionSelect items={data.colorFunctions} bind:selected={data.colorFunctionsIndex} />
		</CanvasManager>
	</div>
</div>

<style lang="scss">
	.sketch-wrapper {
		display: grid;
		grid-template-areas: 'canvas controls';
		grid-template-columns: 4fr 1fr;
	}

	#canvas {
		grid-area: canvas;
	}
	.controls {
		grid-area: controls;
	}
</style>
