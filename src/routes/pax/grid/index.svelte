<script>
	// import components
	import CanvasManager from '$components/CanvasManager.svelte';
	import Slider from '$components/Slider.svelte';
	import Checkbox from '$components/Checkbox-import.svelte';
	import OptionSelect from '$components/OptionSelect.svelte';
	import { onMount } from 'svelte';
	import { storedSettingsChange } from '$stores/stores.js';
	// import Grid from '../grid.svelte';
	import { defineGrid, extendHex } from 'honeycomb-grid';
	import Button from '$components/Button.svelte';

	// $: $storedSettingsChange
	$: console.log(
		`🚀 ~ file: index.svelte ~ line 15 ~ $storedSettingsChange`,
		$storedSettingsChange
	);
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
	$: stars = [];
	let mounted = false,
		animating = false;
	let counter = 0;
	let radius = Math.min(w, h) / 4;
	let data = {
		TITLE: 'Pax01-vanilla',
		fps: 60,
		numStars: 10,
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
		drawStars: true,
		drawShips: true,
		drawCenters: true,
		drawHexes: true,
		drawVerticies: false,
		buildVertices: true
	};
	let hexCenterCoords = [];
	let hexVertexCoords = [];
	let uniqueVertexCoords = [];

	onMount(async () => {
		mounted = true;
		w = canvas.width = window.innerWidth * 0.8;
		h = canvas.height = window.innerHeight;
		canvasInit();
		mapInit(
			data.drawStars,
			data.drawShips,
			data.drawCenters,
			data.drawHexes,
			data.buildVertices,
			data.drawVertices
		);
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

	function canvasRedraw() {
		ctx.fillStyle = '#222';
		ctx.fillRect(0, 0, w, h);
	}

	async function mapInit(starsToggle, shipsToggle, center, outline, buildVertices, drawVertices) {
		console.log(
			`🚀 ~ file: index.svelte ~ line 96 ~ mapInit ~ starsToggle, shipsToggle, center, outline, buildVertices, drawVertices`,
			starsToggle,
			shipsToggle,
			center,
			outline,
			buildVertices,
			drawVertices
		);

		// hexCenterCoords = [];
		generateHexGrid(w, h, data.gridRadius, data.gridOffset);
		if (buildVertices) {
			console.log(`🚀 ~ file: index.svelte ~ line 90 ~ mapInit ~ buildVertices`, buildVertices);
			// hexVertexCoords = [];
			data.buildVertices = false;
			getVertexCoords();
			uniqueVertexCoords = removeDuplicates(hexVertexCoords);
		}
		// drawOnHexCoords(true, true, true);
		// drawOnHexCoords(true, false, true);
		drawOnHexCoords(starsToggle, center, outline, drawVertices);
		drawStars(starsToggle, shipsToggle);
	}

	function drawStars(starsToggle = true, shipsToggle = true) {
		// console.log(`🚀 ~ file: index.svelte ~ line 119 ~ drawStars ~ stars.length`, stars.length)
		// console.log(`🚀 ~ file: index.svelte ~ line 122 ~ drawStars ~ data.numStars`, data.numStars)
		// console.log(`🚀 ~ file: index.svelte ~ line 120 ~ drawStars ~ stars`, stars)
		stars.length < data.numStars ? (stars = generateStars(data.numStars - stars.length)) : null;
		stars.length > data.numStars ? stars.splice(data.numStars, stars.length) : null;
		stars.forEach((star) => {
			starsToggle ? star.draw(ctx) : null;
			shipsToggle ? drawShips(star) : null;
			console.log(`🚀 ~ file: index.svelte ~ line 127 ~ stars.forEach ~ animating`, animating);
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
		ctx.strokeStyle = `hsla(${cx + cy}, 100%, 50%, 1)`;

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

	function drawOnHexCoords(starsToggle, shipsToggle, center, outline, vertices) {
		let i = 0;
		drawStars(starsToggle, shipsToggle);
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
		if (vertices) {
			uniqueVertexCoords.forEach((vertex, i) => {
				drawHex(vertex.x, vertex.y, 5);
			});
		}
	}

	function onClick(e) {
		console.log('click', e.x, ':', e.y);
		// drawDot();
		stars.forEach((star) => {
			// if(e.x >= star.xMin && e.x <= star.xMax){
			// 	console.log(`🚀 ~ file: index.svelte ~ line 193 ~ onClick ~ e.x <= star.xMax`, e.x <= star.xMax)
			// }
			// if(e.y >= star.yMin && e.y <= star.yMax){
			// 	console.log(`🚀 ~ file: index.svelte ~ line 203 ~ onClick ~ e.y <= star.yMax`, e.y <= star.yMax)
			// }
			if (e.x >= star.xMin && e.x <= star.xMax && e.y >= star.yMin && e.y <= star.yMax) {
				console.log('click HIT!!!! ', e.x, ':', e.y, star);
				if (star.highlighted) {
					star.unhighlight(ctx);
				} else {
					star.highlight(ctx);
				}
				star.highlighted = !star.highlighted;
				// console.log(`🚀 ~ file: index.svelte ~ line 188 ~ onClick ~ star HITTTT!!!!`, star);
			}
		});
	}

	function toggleAnimate() {
		animating ? (animating = false) : (animating = true);
		animating ? animate() : null;
	}

	function reset() {
		// data.clearLS = true
		init();
	}

	function onChange(e) {
		console.log('change');
		console.log(`🚀 ~ file: index.svelte ~ line 194 ~ onChange ~ e`, e.detail);
		canvasRedraw();
		drawOnHexCoords(
			data.drawStars,
			data.drawShips,
			data.drawCenters,
			data.drawHexes,
			data.drawVertices
		);
		// animating ? (animating = false) : (animating = true);
		// animating ? animate() : null;
	}

	// write a function that generates stars using random coordinates from hexCenterCoords
	function generateStars(num) {
		// stars = [];
		const flag = {};
		for (let i = 0; i < num; i++) {
			let coords = hexCenterCoords[Math.floor(Math.random() * hexCenterCoords.length)];
			if (!flag[coords.x + ':' + coords.y]) {
				flag[coords.x + ':' + coords.y] = true;
				let starType = Math.floor(Math.random() * data.numTypes);
				let star = new Star(
					`star-${i}`,
					coords.x,
					coords.y,
					starType + data.starRadius,
					starType,
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

	function animate() {
		counter++;
		if (animating) {
			setTimeout(function () {
				requestAnimationFrame(animate);
				ctx.fillStyle = '#222';
				ctx.fillRect(0, 0, w, h);
				ctx.save();
				stars.forEach((star) => {
					data.drawStars ? star.draw(ctx) : null;
					data.drawShips ? drawShips(star) : null;
				});
				ctx.restore();
				ctx.save();
				drawOnHexCoords(
					data.drawStars,
					data.drawShips,
					data.drawCenters,
					data.drawHexes,
					data.drawVertices
				);
				ctx.restore();
				++frame;
			}, 1000 / data.fps);
		} else {
			return;
		}
	}

	class Vector {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	}
	class Star {
		constructor(id, x, y, radius, type, hue, numShips) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.type = type;
			this.hue = hue;
			this.numShips = numShips;
			this.xMin = x - radius;
			this.xMax = x + radius;
			this.yMin = y - radius;
			this.yMax = y + radius;
			// addEventListener('click', this.handleEvent);
			// addEventListener('mouseover', this.handleEvent);
		}

		draw(ctx) {
			let star = new Path2D();
			ctx.beginPath();
			star.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue}, 50%, 50%, 1)`;
			ctx.fill(star);
			if (data.drawStarNumber) {
				ctx.fillText(this.id, this.x, this.y);
			}
			if (this.highlighted) {
				this.highlight(ctx);
			}
		}

		highlight(ctx) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius * 1.2, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue + 20}, 100%, 50%, 1)`;
			ctx.fill();
			ctx.restore();
		}

		unhighlight(ctx) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius * 1.3, 0, 2 * Math.PI);
			ctx.fillStyle = '#222';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue + 20}, 50%, 50%, 1)`;
			ctx.fill();
			ctx.restore();
		}

		handleEvent(e) {
			console.log(`🚀 ~ file: index.svelte ~ line 334 ~ Star ~ onEvent ~ e.type: `, e.type);
			console.log(`🚀 ~ file: index.svelte ~ line 334 ~ Star ~ onEvent ~ e`, e);
			console.log(`🚀 ~ file: index.svelte ~ line 214 ~ onEvent ~ this`, this.x);
			console.log(`🚀 ~ file: index.svelte ~ line 214 ~ onEvent ~ this`, this.y);
			if (e.type === 'mouseover') {
				console.log(` e.type: mouseover `);
				this.hue = 0;
			}
		}
	}

	class Handler extends Star {
		constructor(currentTarget) {
			super();
			currentTarget.addEventListener('click', this);
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

<svelte:head>
	<script src="https://zimjs.org/cdn/nft/01/zim.js"></script>
</svelte:head>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<!-- <Grid /> -->
<div class="sketch-wrapper">
	<canvas id="canvas" bind:this={canvas} />
	<div class="controls flex flex-col p-5">
		<CanvasManager {data} on:change={onChange}>
			<Slider
				label="Number of stars"
				on:message={(e) => onChange(e)}
				bind:value={data.numStars}
				min="1"
				max="50"
				step="1"
			/>
			<Slider
				label="Ships min"
				on:message={onChange}
				bind:value={data.shipsMin}
				min="1"
				max="50"
				step="1"
			/>
			<Slider
				label="Ships max"
				on:message={onChange}
				bind:value={data.shipsMax}
				min="5"
				max="250"
				step="5"
			/>
			<Slider
				label="Speed"
				on:message={onChange}
				bind:value={data.speed}
				min="5"
				max="100"
				step="5"
			/>
			<Slider label="FPS" on:message={onChange} bind:value={data.fps} min="1" max="60" step="1" />
			<Slider
				label="Orbit X mod"
				on:message={onChange}
				bind:value={data.orbitXmod}
				min=".1"
				max="5"
				step=".1"
			/>
			<Slider
				label="Orbit Y mod"
				on:message={onChange}
				bind:value={data.orbitYmod}
				min=".1"
				max="5"
				step=".1"
			/>
			<button
				label="Start"
				class="p-3 m-2 bg-sky-600 hover:bg-sky-500 rounded"
				on:click={toggleAnimate}>Animate</button
			>
			<button
				label="Start"
				class="p-3 m-2 bg-sky-600 hover:bg-sky-500 rounded"
				on:click={drawOnHexCoords}>Redraw grid</button
			>
			<button label="Start" class="p-3 m-2 bg-sky-600 hover:bg-sky-500 rounded" on:click={mapInit}
				>Clear localStorage</button
			>
			<Checkbox
				duration="200"
				label="Draw stars"
				on:change={onChange}
				bind:checked={data.drawStars}
			/>
			<Checkbox
				duration="200"
				label="Draw ships"
				on:change={onChange}
				bind:checked={data.drawShips}
			/>
			<Checkbox
				duration="200"
				label="Draw Centers"
				on:change={onChange}
				bind:checked={data.drawCenters}
			/>
			<Checkbox
				duration="200"
				label="Draw Hexes"
				on:change={onChange}
				bind:checked={data.drawHexes}
			/>
			<Checkbox
				duration="200"
				label="Draw Vertices"
				on:change={(e) => onChange(e)}
				bind:checked={data.drawVertices}
			/>
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
