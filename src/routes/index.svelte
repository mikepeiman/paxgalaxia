<script>
	// import components
	import CanvasManager from '$components/CanvasManager.svelte';
	import Slider from '$components/Slider.svelte';
	import Checkbox from '$components/Checkbox-import.svelte';
	import OptionSelect from '$components/OptionSelect.svelte';
	import { onMount } from 'svelte';
	import { storedSettingsChange } from '$stores/stores.js';
	import {
		canvas_arrow,
		getPositionAlongTheLine,
		getPointOnVectorByDistance
	} from '$lib/canvas-arrow';

	$: console.log(
		`🚀 ~ file: index.svelte ~ line 15 ~ $storedSettingsChange`,
		$storedSettingsChange
	);
	let settings = {};
	let w,
		h,
		canvas,
		ctx,
		cx,
		cy,
		stars = [],
		theta = 0,
		alpha = 0,
		modAlpha = 1,
		timestamp = 0,
		lastRender = 0,
		activeStar = null,
		originStarId,
		previousOriginStarId,
		destinationStarId,
		mousedownStarId,
		mouseupStarId;
	$: console.log(
		`🚀 ~ file: index.svelte ~ line 30 ~ \n\nmousedownStarId`,
		mousedownStarId,
		`\nmouseupStarId`,
		mouseupStarId
	);

	$: console.log(
		`🚀 ~ file: index.svelte ~ line 28 ~ \n\noriginStarId`,
		originStarId,
		`\ndestinationStarId`,
		destinationStarId,
		`\npreviousOriginStarId`,
		previousOriginStarId,
		`\activeStar`,
		activeStar
	);

	$: console.log(w, h);
	$: w, h;
	$: cx = w / 2;
	$: cy = h / 2;
	// $: stars = [];
	let mounted = false,
		animating = false;
	let counter = 0,
		frame = 0,
		tick = 0;
	let radius = Math.min(w, h) / 4;
	let data;
	data = {
		TITLE: 'Pax01-vanilla',
		fps: 60,
		tickRate: 10,
		numStars: 1,
		numTypes: 1,
		shipsMin: 10,
		shipsMax: 10,
		starRadius: 20,
		shipRadius: 5,
		gridRadius: 55,
		gridOffset: 0,
		orbitXmod: 1, // interesting variations: 5:5, everything 4.5+:5, 3.3:5, 2.5:5, 1.7:5, 1.6:5, .8:5, 0.6:5, 0.3:5
		orbitYmod: 1,
		speed: 0.01,
		clearLS: false,
		drawStars: true,
		drawShips: true,
		drawCenters: false,
		drawHexes: true,
		drawVertices: true,
		buildVertices: true,
		drawLabels: true,
		stars: []
	};
	let hexCenterCoords = [];
	let hexVertexCoords = [];
	let uniqueVertexCoords = [];
	let previousData = false;
	$: console.log(`🚀 ~ file: index.svelte ~ line 67 ~ previousData`, previousData);

	let localStorageSupported = (() => {
		try {
			return typeof window.localStorage !== 'undefined';
		} catch (err) {
			return false;
		}
	})();
	$: console.log(
		`🚀 ~ file: index.svelte ~ line 71 ~ localStorageSupported ~ localStorageSupported`,
		localStorageSupported
	);

	$: data.stars = stars;
	// $: console.log(`🚀 ~ file: index.svelte ~ line 80 ~ data.stars`, data.stars);
	// $: console.log(`🚀 ~ file: index.svelte ~ line 78 ~ stars`, stars);

	function readData(data) {
		if (localStorageSupported) {
			try {
				const prev = window.localStorage.getItem(`${data.TITLE}`);
				if (!prev) return;
				// const newData = JSON.parse(prev);
				// Object.assign(data, newData);
				data = prev;
				// console.log(`🚀 ~ file: index.svelte ~ line 93 ~ readData ~ data`, data)
				// stars = data.stars;
				data['stars']?.length > 1
					? ((previousData = true), (stars = data.stars))
					: (previousData = false);
				// console.log(`🚀 ~ file: index.svelte ~ line 85 ~ readData ~ stars`, stars);
				return true;
			} catch (err) {
				console.warn(err);
				return false;
			}
		}
	}

	onMount(async () => {
		mounted = true;
		timestamp = performance.now();
		w = canvas.width = window.innerWidth * 0.8;
		h = canvas.height = window.innerHeight;
		canvasInit();
		let dataFound = readData(data);
		console.log(`🚀 ~ file: index.svelte ~ line 114 ~ onMount ~ dataFound`, dataFound);
		console.log(`🚀 ~ file: index.svelte ~ line 114 ~ onMount ~ readData(data)		`, readData(data));
		mapInit(
			data.drawStars,
			data.drawShips,
			data.drawCenters,
			data.drawHexes,
			data.buildVertices,
			data.drawVertices
		);
		// console.log(`🚀 ~ file: index.svelte ~ line 52 ~ onMount ~ stars`, stars);
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
		canvas.addEventListener('mousedown', onClick);
		canvas.addEventListener('mouseup', onClick);
		canvas.addEventListener('contextmenu', onClick);
		// canvas.addEventListener('mouseenter', onClick);
		// canvas.addEventListener('mouseleave', onClick);
		// canvas.addEventListener('mouseover', onClick);
	}

	function canvasRedraw() {
		ctx.fillStyle = '#222';
		ctx.fillRect(0, 0, w, h);
		drawOnHexCoords(
			data.drawStars,
			data.drawShips,
			data.drawCenters,
			data.drawHexes,
			data.drawVertices
		);
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

		window.localStorage.removeItem(`${data.TITLE}`);

		// hexCenterCoords = [];
		generateHexGrid(w, h, data.gridRadius, data.gridOffset);
		if (buildVertices) {
			console.log(`🚀 ~ file: index.svelte ~ line 90 ~ mapInit ~ buildVertices`, buildVertices);
			// hexVertexCoords = [];
			// data.buildVertices = false;
			getVertexCoords();
			uniqueVertexCoords = removeDuplicates(hexVertexCoords);
		}
		// drawOnHexCoords(true, true, true);
		// drawOnHexCoords(true, false, true);
		drawOnHexCoords(starsToggle, shipsToggle, center, outline, drawVertices);
		drawStars(starsToggle, shipsToggle);
	}

	function drawLayers(starsToggle, shipsToggle, center, outline, buildVertices, drawVertices) {
		console.log(
			`🚀 ~ file: index.svelte ~ line 174 ~ drawLayers ~ starsToggle, shipsToggle, center, outline, buildVertices, drawVertices`,
			starsToggle,
			shipsToggle,
			center,
			outline,
			buildVertices,
			drawVertices
		);

		drawOnHexCoords(starsToggle, shipsToggle, center, outline, drawVertices);
		drawStars(starsToggle, shipsToggle);
	}

	function drawStars(starsToggle = true, shipsToggle = true) {
		// console.log(`🚀 ~ file: index.svelte ~ line 119 ~ drawStars ~ stars.length`, stars.length)
		// console.log(`🚀 ~ file: index.svelte ~ line 122 ~ drawStars ~ data.numStars`, data.numStars)
		// console.log(`🚀 ~ file: index.svelte ~ line 120 ~ drawStars ~ stars`, stars);
		stars.length < data.numStars ? (stars = generateStars(data.numStars - stars.length)) : null;
		stars.length > data.numStars ? stars.splice(data.numStars, stars.length) : null;
		stars.forEach((star) => {
			starsToggle ? star.draw(ctx) : null;
			shipsToggle ? drawShips(star) : null;
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

	function drawHex(cx, cy, r, lineWidth, color) {
		const a = (2 * Math.PI) / 6;
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		// let hex = new Shape().addTo().s("ff0").ss(4).mt(cx, cy).lt(cx + r, cy);
		for (let i = 0; i <= 6; i++) {
			const x = roundNum(cx + r * Math.cos(a * i), 3);
			const y = roundNum(cy + r * Math.sin(a * i), 3);
			ctx.lineTo(x, y);
		}
		ctx.stroke();
		ctx.restore();
	}

	// let hex = new Path2D();
	// i < 6 ? ctx.lineTo(x, y) : ctx.closePath()
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
	}

	function drawOnHexCoords(starsToggle, shipsToggle, center, outline, vertices) {
		// console.log(
		// 	`🚀 ~ file: index.svelte ~ line 297 ~ drawOnHexCoords ~ starsToggle, shipsToggle, center, outline, vertices`,
		// 	starsToggle,
		// 	shipsToggle,
		// 	center,
		// 	outline,
		// 	vertices
		// );
		let i = 0;
		drawStars(starsToggle, shipsToggle);
		hexCenterCoords.forEach((hex) => {
			let color = `hsla(${i++}, 100%, 50%, 1)`;
			if (center) {
				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.arc(hex.x, hex.y, 5, 0, 2 * Math.PI);
				ctx.fill();
			}
			if (outline) {
				let lineWidth = 1;
				drawHex(hex.x, hex.y, hex.r, lineWidth, color);
			}
		});
		if (vertices) {
			uniqueVertexCoords.forEach((vertex, i) => {
				let color = `hsla(${i}, 50%, 50%, 1)`;
				let lineWidth = 1;
				drawHex(vertex.x, vertex.y, 5, lineWidth, color);
			});
		}
	}

	function onClick(e) {
		console.log(`🚀 ~ file: index.svelte ~ line 305 ~ onClick ~ e ✅✅✅🔥🔥🔥  `, e.type),
			`  ✅✅✅🔥🔥🔥`;
		console.log('click', e.x, ':', e.y);
		let hit = false;
		stars.forEach((star) => {
			// if we get a pixel hit
			if (e.x >= star.xMin && e.x <= star.xMax && e.y >= star.yMin && e.y <= star.yMax) {
				hit = true;
				if (e.type === 'contextmenu' || e.button === 2) {
					e.preventDefault();
					star.destinationStarId = null;
				}
				e.type === 'mousedown' ? (mousedownStarId = star.id) : null;
				e.type === 'mouseup' ? (mouseupStarId = star.id) : null;
				e.type === 'mousedown' ? console.log(`getStarById: `, getStarById(star.id)) : null;

				if (e.type === 'mouseup' && e.button !== 2) {
					console.log(`🚀 ~ file: index.svelte ~ line 422 ~ stars.forEach ~ star`, star);
					activeStar ? (activeStar.active = false) : null;
					activeStar = star;
					star.active = true;
					if (star.highlighted) {
						star.unhighlight(ctx);
					} else {
						star.highlight(ctx);
					}
					star.draw(ctx);
				}
			}
			if (hit && e.type === 'mouseup' && e.button !== 2) {
				if (mousedownStarId !== mouseupStarId) {
					originStarId = mousedownStarId;
					destinationStarId = previousOriginStarId = mouseupStarId;
					// activeStar = getStarById(mouseupStarId)
					let origin = getStarById(originStarId);
					origin.destinationStarId = destinationStarId;
				}

				if (mousedownStarId === mouseupStarId) {
					originStarId = mousedownStarId;
					if (previousOriginStarId !== originStarId && previousOriginStarId) {
						console.log(
							`🚀 ~ file: index.svelte ~ line 442 ~ stars.forEach ~ previousOriginStarId !== originStarId && previousOriginStarId`,
							previousOriginStarId !== originStarId && previousOriginStarId
						);
						destinationStarId = originStarId;
						let origin = getStarById(previousOriginStarId);
						origin.destinationStarId = mouseupStarId;
					}
					previousOriginStarId = originStarId;
				}
			}
		});

		if (e.type === 'mouseup' && e.type !== 'contextmenu') {
			canvasRedraw();
			stars.forEach((star) => {
				if (star.id && star.destinationStarId && star.destinationStarId !== star.id) {
					let origin = getStarById(star.id);
					let destination = getStarById(star.destinationStarId);
					canvas_arrow(ctx, destination, origin);
				}
			});
		}
		if (e.type === 'contextmenu' || e.button === 2) {
			e.preventDefault();
			if (activeStar) {
				activeStar.active = false;
				activeStar.draw(ctx);
			}
			activeStar = null;
			originStarId = null;
			destinationStarId = null;
			previousOriginStarId = null;
			return false;
		}
	}

	function getStarById(id) {
		return stars.filter((star) => star.id === id)[0];
	}

	function toggleAnimate() {
		animating ? (animating = false) : (animating = true);
		animating ? animate() : null;
	}

	function clearLS() {
		window.localStorage.removeItem(`${data.TITLE}`);
		window.location.reload();
	}

	function onChange(e) {
		console.log('change');
		console.log(`🚀 ~ file: index.svelte ~ line 194 ~ onChange ~ e`, e.detail);
		canvasRedraw();
	}

	// write a function that generates stars using random coordinates from hexCenterCoords
	function generateStars(num) {
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
					starType + 1,
					Math.floor(Math.random() * data.numTypes) * (360 / data.numTypes),
					Math.floor(Math.random() * data.shipsMax)
				);
				star.ships = generateShips(star);
				stars = [...stars, star];
			} else {
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
		let ships = star.ships = []
		let numShips = star.numShips;
		for (let i = 0; i < numShips; i++) {
			let ship = addShipToStar(star, i);
			ships.push(ship);
		}
		// setShipOrbits(star)
		drawShips(star);
		return ships;
	}

	function adjustShipNumber(star) {
		let currentNumberOfShips = star.ships.length;
		console.log(`🚀 ~ file: index.svelte:493 ~ adjustShipNumber ~ star.numShips:`, star.numShips);
		console.log(`🚀 ~ file: index.svelte:490 ~ adjustShipNumber ~ currentNumberOfShips:`, currentNumberOfShips)
		star.numShips;
		if(currentNumberOfShips > star.numShips) {
			destroyShips(star, star.ships.length - star.numShips)
			drawShips(star);
		}
		if (currentNumberOfShips < star.numShips) {
			generateShips(star);

		} else {
			return
		}


		console.log(`⚡ ~ file: index.svelte:502 ~ adjustShipNumber ~ star.numShips:`, star.numShips);
		console.log(
			`⚡ ~ file: index.svelte:504 ~ adjustShipNumber ~ star.ships.length:`,
			star.ships.length
		);
		// setShipOrbits(star);
	}

	function setShipOrbits(star) {
		star.ships.forEach((ship, i) => {
			ship.orbit = 2 * (data.shipRadius + Math.sqrt(i));
		});
	}

	function destroyShips(star, num) {
		let ships = star.ships;
		for (let i = 0; i < num; i++) {
			ships.pop();
		}
		star.ships = ships;
		return ships;
	}

	function addShipToStar(star, i) {
		// let color = `hsla(${star.hue + Math.random() * i}, ${
		// 	Math.random > 0.5 ? 50 + Math.random() * i * 5 : 50 - Math.random() * i
		// }%, ${Math.random > 0.5 ? 75 + Math.random() * i * 5 : 50 - Math.random() * i}%, ${
		// 	Math.random > 0.5 ? Math.random() + 0.25 : Math.random() - 0.25
		// })`;
		let color = `hsla(${star.hue}, 50%, 80%, 0.25)`;
		let radius = data.shipRadius;
		let orbit = star.radius + data.shipRadius * 3;
		let angle = (2 * Math.PI * i) / star.numShips;
		// let orbit = star.radius + data.shipRadius + 3;
		// let orbit = star.radius + i ;
		// let orbit = star.radius + i % 2
		// let orbit = star.radius + i % (data.shipRadius + 3);
		// let orbit = star.radius + i % 2 * (data.shipRadius + 3);
		let ship = new Ship(radius, color, orbit, angle);
		return ship;
	}

	function drawShips(star) {
		let x, y;
		star['ships'].forEach((ship, i) => {
			ship.angle += data.speed;
			x = star.x + Math.cos(ship.angle) * ship.orbit * data.orbitYmod;
			y = star.y + Math.sin(ship.angle) * ship.orbit * data.orbitYmod;
			ship.pos = { x, y };
			ctx.beginPath();
			ctx.arc(x, y, 4, 0, 2 * Math.PI);
			// ctx.fillStyle = ship.color;
			ctx.lineWidth = 1;
			ctx.strokeStyle = ship.color;
			ctx.stroke();
			// ctx.fill();
		});
	}

	function transferShips(star) {
		if (star.destinationStarId) {
			let dest = getStarById(star.destinationStarId);
			let j = 0;
			star.shipsToTransfer.forEach((ship, i) => {
				// ship.distance++;
				// console.log(`🚀 ~ file: index.svelte ~ line 559 ~ shipsToTransfer.forEach ~ ship`, ship)
				ship.distance += j;
				j++;
				let pos = getPositionAlongTheLine(
					ship.pos.x,
					ship.pos.y,
					dest.x,
					dest.y,
					ship.distance / 100
				);
				// ctx.save()
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, ship.radius, 0, 2 * Math.PI);
				// ctx.fillStyle = ship.color;
				ctx.strokeStyle = ship.color;
				ctx.stroke();
				// ctx.fill();
				// ctx.restore()
				if (ship.distance >= 95) {
					ship.distance = 0;
					dest.ships.push(ship);
					star.shipsToTransfer.splice(i, 1);
					dest.numShips++;
					star.numShips--;
				}
			});
			// transfer shipsPerTick to destination star
		}
	}

	function calculateNumberOfShips(star) {
		let shipsPerTick = Math.ceil(star.numShips * star.shipsPerTickPercentage);
		console.log(
			`🚀 ~ file: index.svelte:584 ~ calculateNumberOfShips ~ shipsPerTick:`,
			shipsPerTick
		);
		star.shipsPerTick = shipsPerTick;
		star.shipsToTransfer = [...star['ships'].slice(0, shipsPerTick)];
	}

	function bounceAlpha() {
		alpha >= 1 ? (modAlpha = -1) : null;
		alpha <= 0 ? (modAlpha = 1) : null;
		let inc = 0.007 * modAlpha;
		alpha += inc;
		return alpha.toFixed(3);
	}

	function animate() {
		counter++;
		if (frame % data.fps === 0) {
			tick++;
			tickUpdateShips();
			console.log(`🚀 ~ file: index.svelte ~ line 392 ~ animate ~ tick`, tick);
		}
		tick;
		if (animating) {
			setTimeout(function () {
				requestAnimationFrame(animate);
				ctx.fillStyle = '#222';
				ctx.fillRect(0, 0, w, h);
				ctx.save();

				stars.forEach((star) => {
					data.drawStars ? star.draw(ctx) : null;
					data.drawShips ? drawShips(star) : null;
					star.destinationStarId ? transferShips(star) : null;
				});
				// stars.forEach((star) => {
				// });
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

	function tickUpdateShips() {
		console.log(
			`🚀 ~ file: index.svelte:637 ~ stars.forEach ~ star[0]:`,
			stars[0],
			stars[0].ships.length
		);
		stars.forEach((star) => {
			star.update();
			calculateNumberOfShips(star);
			adjustShipNumber(star);
		});
	}

	function clearVectors() {
		stars.forEach((star) => {
			star.destinationStarId = null;
		});
		canvasRedraw();
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
			this.ships = [];
			this.highlighted = false;
			this.active = false;
			this.destinationStarId = null;
			this.shipsPerTickPercentage = 0.05;
			this.shipsPerTick = 2;
			this.shipsToTransfer = [];
			// addEventListener('click', this.handleEvent);
			// addEventListener('mouseover', this.handleEvent);
		}

		draw(ctx) {
			let star = new Path2D();
			ctx.beginPath();
			star.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue}, 50%, 50%, 1)`;
			ctx.fill(star);
			let fontSize = 18;
			if (this.highlighted) {
				this.highlight(ctx);
			}
			if (this.active) {
				this.activeHighlight(ctx);
			}
			if (data.drawLabels) {
				ctx.font = `bold ${fontSize}px sans-serif`;
				ctx.textAlign = 'center';
				// ctx.fillText(this.ships.length, this.x - this.radius / 3, this.y + fontSize / 3);
				ctx.fillStyle = '#fff';
				ctx.fillText(this.id, this.x, this.y - fontSize / 2);
				ctx.fillStyle = '#000';
				ctx.fillText(this.ships.length, this.x, this.y + fontSize / 3);
			}
			if (this.destinationStarId) {
				let destination = getStarById(this.destinationStarId);
				let origin = getStarById(this.id);
				canvas_arrow(ctx, destination, origin);
			}
		}

		update() {
			this.type === 1 ? this.numShips++ : null;
			this.type === 2 && tick % 2 == 0 ? this.numShips++ : null;
			this.type === 3 && tick % 3 == 0 ? this.numShips++ : null;
			this.type === 4 && tick % 4 == 0 ? this.numShips++ : null;
			this.type === 5 && tick % 5 == 0 ? this.numShips++ : null;
		}

		highlight(ctx) {
			// ctx.save();
			this.highlighted = true;
			ctx.beginPath();

			// ctx.lineWidth = 1;
			ctx.arc(this.x, this.y, this.radius * 1.2, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue + 20}, 100%, 50%, 1)`;
			ctx.fill();
			// ctx.restore();
		}
		activeHighlight(ctx) {
			// ctx.save();
			this.highlighted = true;
			let lineWidth = 3;
			let color = `hsla(${this.hue}, 100%, 50%, 1)`;
			drawHex(this.x, this.y, this.radius * 2, lineWidth, color);
			// ctx.lineWidth = 1;
			// ctx.arc(this.x, this.y, this.radius * 2.2, 0, 2 * Math.PI);
			// ctx.fillStyle = `hsla(${this.hue + 20}, 100%, 50%, 1)`;
			// ctx.fill();
			// ctx.restore();
		}

		unhighlight(ctx) {
			this.highlighted = false;
			// ctx.save();

			ctx.beginPath();
			// ctx.lineWidth = 1;
			ctx.arc(this.x, this.y, this.radius * 2, 0, 2 * Math.PI);
			ctx.fillStyle = '#222';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue + 20}, 50%, 50%, 1)`;
			ctx.fill();
			// ctx.restore();
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
		constructor(radius, color, orbit, angle) {
			this.radius = radius;
			this.color = color;
			this.orbit = orbit;
			this.distance = 0;
			this.pos = { x: 0, y: 0 };
			this.angle = angle;
		}
	}
</script>

<svelte:head>
	<!-- <script src="https://zimjs.org/cdn/nft/01/zim.js"></script> -->
	<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
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
				min=".005"
				max=".05"
				step=".005"
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
				on:click={clearVectors}>Remove directions</button
			>
			<button
				label="Start"
				class="p-3 m-2 bg-sky-600 hover:bg-sky-500 rounded"
				on:click={drawOnHexCoords}>Redraw grid</button
			>
			<button label="Start" class="p-3 m-2 bg-sky-600 hover:bg-sky-500 rounded" on:click={mapInit}
				>Re-initialize map</button
			>
			<button label="Start" class="p-3 m-2 bg-sky-600 hover:bg-sky-500 rounded" on:click={clearLS}
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
			<Checkbox
				duration="200"
				label="Draw Labels"
				on:change={(e) => onChange(e)}
				bind:checked={data.drawLabels}
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
