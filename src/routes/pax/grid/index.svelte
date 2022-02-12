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
		numStars: 20,
		shipsMin: 1,
		shipsMax: 50,
		orbitXmod: 1,
		orbitYmod: 1,
		speed: 10
	};
	onMount(async () => {
		mounted = true;
		init();
		w = canvas.width = window.innerWidth * 0.8;
		h = canvas.height = window.innerHeight;
		// drawHexGrid(w, h, 36);
		generateHexGrid(w, h, 25, 0);
		getVertexCoords()
		drawOnHexCoords(true, true, true);
		console.log(`🚀 ~ file: index.svelte ~ line 62 ~ drawHex ~ hexVertexCoords`, hexVertexCoords);
		// let unique = await new UniqueArray(hexVertexCoords)
		// let u = uniqueArray(hexVertexCoords);
		let u2 = removeDuplicates(hexVertexCoords);
		console.log(`🚀 ~ file: index.svelte ~ line 53 ~ onMount ~ u2`, u2);
		// console.log(`🚀 ~ file: index.svelte ~ line 52 ~ onMount ~  u`,  u)
		// console.log(`🚀 ~ file: index.svelte ~ line 51 ~ onMount ~ unique`, await unique)
	});

	function getVertexCoords() {
		hexCenterCoords.forEach((coord) => {
			const a = (2 * Math.PI) / 6;
			for (let i = 0; i <= 6; i++) {
				const x = roundNum(coord.x + coord.r * Math.cos(a * i), 3);
				const y = roundNum(coord.y + coord.r * Math.sin(a * i), 3);
				hexVertexCoords = [...hexVertexCoords, { x, y}];
			}
		});
	}

	let hexCenterCoords = [];
	let hexVertexCoords = [];


	function drawHex(cx, cy, r) {
		const a = (2 * Math.PI) / 6;
		ctx.beginPath();
		ctx.strokeStyle = `hsla(${cx - cy}, 100%, 50%, 1)`;

		for (let i = 0; i <= 6; i++) {
			const x = roundNum(cx + r * Math.cos(a * i), 3);
			const y = roundNum(cy + r * Math.sin(a * i), 3);
			ctx.lineTo(x, y);
		}
		ctx.stroke();
	}

	function uniqueArray(arr) {
		return arr.filter((item, index) => {
			return (
				arr.filter((item2, index2) => {
					return item.x === item2.x && item.y === item2.y;
				}).length === 1
			);
		});
	}

	const removeDuplicates = (objArray) => {
		const flag = {};
		const unique = [];
		objArray.forEach((obj) => {
			if (!obj.flag) {
				obj.flag = true;
				unique.push(obj);
			}
			// if (!flag[obj.x] || !flag[obj.y]) {
			// 	unique.push(obj)
			// 	flag[obj.x] = true
			// 	flag[obj.y] = true
			// }
		});
		console.log(`🚀 ~ file: index.svelte ~ line 82 ~ removeDuplicates ~ flag`, flag);
		return unique;
	};

	class UniqueArray extends Array {
		constructor(array) {
			super();
			array.forEach((item) => {
				// remove duplicates
				if (!this.includes(item)) {
					this.push(item);
				} else {
					console.log(`🚀 ~ file: index.svelte ~ line 51 ~ UniqueArray ~ NOT UNIQUE item`, item);
				}

				// console.log(`🚀 ~ file: index.svelte ~ line 72 ~ UniqueArray ~ array.forEach ~ item`, item)
				// if (!this.find((v) => _.isEqual(v, a))) this.push(a);
			});
		}
	}

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
				// drawHex(x, y, r);
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
			hexVertexCoords.forEach((vertex, i) => {
				// console.log(`🚀 ~ file: index.svelte ~ line 159 ~ hexCenterCoords.forEach ~ vertex`, vertex)
				drawHex(vertex.x, vertex.y, 5);
				// ctx.fillstyle = '#33f';
				// ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI);
			});
		}
	}

	function onClick() {
		console.log('click');
		// drawDot();
		animating ? (animating = false) : (animating = true);
		animating ? animate() : null;
	}

	async function init() {
		canvas = document.getElementById('canvas');
		// let grid = Grid.rectangle({ width: 4, height: 4 });
		// console.log(`🚀 ~ file: index.svelte ~ line 56 ~ init ~ grid`, grid);

		w = canvas.width = window.innerWidth * 0.8;
		h = canvas.height = window.innerHeight;
		cx = w / 2;
		cy = h / 2;
		radius = Math.min(w, h) / 4;
		canvas.style.backgroundColor = '#222';
		canvas.style.cursor = 'pointer';
		ctx = canvas.getContext('2d');
		ctx.fillStyle = '#222';
		ctx.fillRect(0, 0, w, h);
		canvas.addEventListener('click', onClick);
		stars = await generateStars(data.numStars);
		stars.forEach((star) => {
			// draw(star);
		});
	}

	async function generateStars(num) {
		stars = [];
		for (let i = 0; i < num; i++) {
			let star = new Star(
				Math.random() * w,
				Math.random() * h,
				Math.random() * 30 + 10,
				Math.random() * 360,
				Math.random() * 50
			);
			star['ships'] = await generateShips(star);
			stars = [...stars, star];
		}
		return stars;
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
		// for(let i = 0; i < star.numShips; i++) {

		//     theta = theta +  i / 50000;
		//     x = star.x + (star.radius + 10) * Math.cos(theta + i /2 ); // adjustments to theta, like using i only on x or y, or i / 2, gives different results
		//     y = star.y + (star.radius + 10) * Math.sin(theta + i * 2);
		//     ctx.beginPath();
		//     ctx.arc(x, y, 4, 0, 2 * Math.PI);
		//     ctx.fillStyle = `hsla(${star.hue}, 100%, 50%, 1)`;
		//     ctx.fill();
		// }
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
			<Checkbox duration="200" label="Random color functions?" bind:checked={data.randomColors} />
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
