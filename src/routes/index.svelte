<script>
	// import components
	import CanvasManager from '$components/CanvasManager.svelte';
	import Slider from '$components/Slider.svelte';
	import Checkbox from '$components/Checkbox-import.svelte';
	import OptionSelect from '$components/OptionSelect.svelte';
	import { onMount } from 'svelte';
	import { storedSettingsChange } from '$stores/stores.js';
	import canvas_arrow from '$lib/canvas-arrow';

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
		drawCenters: false,
		drawHexes: true,
		drawVerticies: false,
		buildVertices: true,
		drawNumShips: true,
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
		// dataFound
		// 	? drawLayers(
		// 			data.drawStars,
		// 			data.drawShips,
		// 			data.drawCenters,
		// 			data.drawHexes,
		// 			data.buildVertices,
		// 			data.drawVertices
		// 	  )
		// 	: mapInit(
		// 			data.drawStars,
		// 			data.drawShips,
		// 			data.drawCenters,
		// 			data.drawHexes,
		// 			data.buildVertices,
		// 			data.drawVertices
		// 	  );
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
			// console.log(`🚀 ~ file: index.svelte ~ line 127 ~ stars.forEach ~ animating`, animating);
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
		// let hex = new Shape().addTo().s("ff0").ss(4).mt(cx, cy).lt(cx + r, cy);
		for (let i = 0; i <= 6; i++) {
			const x = roundNum(cx + r * Math.cos(a * i), 3);
			const y = roundNum(cy + r * Math.sin(a * i), 3);
			ctx.lineTo(x, y);
		}
		ctx.stroke();
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
		// console.log(`🚀 ~ file: index.svelte ~ line 69 ~ drawHex ~ hexCoords`, hexCenterCoords);
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
				ctx.strokeWidth = 1;
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
					star.destinationStarId = null
				}
				e.type === 'mousedown' ? (mousedownStarId = star.id) : null;
				e.type === 'mouseup' ? (mouseupStarId = star.id) : null;
				e.type === 'mousedown' ? console.log(`getStarById: `, getStarById(star.id)) : null;

				if (e.type === 'mouseup' && e.button !== 2) {
					console.log(`🚀 ~ file: index.svelte ~ line 422 ~ stars.forEach ~ star`, star);
					activeStar ? activeStar.active = false : null;
					activeStar = star
					star.active = true
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
						let origin  = getStarById(previousOriginStarId);
						origin.destinationStarId = mouseupStarId;
					}
					previousOriginStarId = originStarId;
				}
			} else if (!hit && e.type === 'mouseup') {
				console.log(
					`🚀 ~ file: index.svelte ~ line 381 ~ stars.forEach ~ !hit && e.type === 'mouseup'`,
					!hit && e.type === 'mouseup'
				);
				// originStarId = null
				// destinationStarId = null
				// previousOriginStarId = null
				// mousedownStarId = null
				// mouseupStarId = null

			}
			// if (activeStar && activeStar.id !== star.id) {
			// 			star.active = false;
			// 			// star.draw(ctx);
			// 		}
		});

		if (e.type === 'mouseup' && e.type !== 'contextmenu') {
			canvasRedraw();
			drawOnHexCoords(
				data.drawStars,
				data.drawShips,
				data.drawCenters,
				data.drawHexes,
				data.drawVertices
			);
			stars.forEach((star) => {
				// if (activeStar.id !== star.id) {
				// 	star.active = false;
				// 	star.draw(ctx);
				// }
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
			activeStar = null
			originStarId = null
			destinationStarId = null
			previousOriginStarId = null
			return false
		}
	}

	function getStarById(id) {
		return stars.filter((star) => star.id === id)[0];
	}

	// position along line by percentage - useful, but not what I want here
	function getPositionAlongTheLine(x1, y1, x2, y2, percentage) {
		return {
			x: x1 * (1.0 - percentage) + x2 * percentage,
			y: y1 * (1.0 - percentage) + y2 * percentage
		};
	}

	function getPointOnVectorByDistance(x1, y1, x2, y2, distance) {
		let angle = Math.atan2(y2 - y1, x2 - x1);
		let x = x1 + Math.cos(angle) * distance;
		let y = y1 + Math.sin(angle) * distance;
		return { x, y };
	}

	function toggleAnimate() {
		animating ? (animating = false) : (animating = true);
		animating ? animate() : null;
		// animating ? gameLoop(timestamp) : null;
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
					Math.floor(Math.random() * data.shipsMax)
				);
				star.ships = generateShips(star);
				stars = [...stars, star];
			} else {
				// console.log(`🚀 ~ file: index.svelte ~ line 214 ~ generateStars ~ else`);
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
		// console.log(`🚀 ~ file: index.svelte ~ line 393 ~ generateShips ~ star.numShips`, star.numShips)
		// console.log(`🚀 ~ file: index.svelte ~ line 390 ~ generateShips ~ star.ships`, star.ships)
		let ships = star.ships;
		// console.log(`🚀 ~ file: index.svelte ~ line 390 ~ generateShips ~ star.ships`, star.ships)
		for (let i = 0; i < star.numShips; i++) {
			// console.log(`🚀 ~ file: index.svelte ~ line 79 ~ generateShips ~ ship`, ship);
			let ship = addShipToStar(star, i);
			ships.push(ship);
		}
		// console.log(`🚀 ~ file: index.svelte ~ line 390 ~ generateShips ~ star.ships`, star.ships)
		return ships;
	}

	function adjustShipNumber(star) {
		star.ships.length > star.numShips
			? destroyShips(star, star.ships.length - star.numShips)
			: null;
		star.ships.length < star.numShips
			? (star.ships = [...star.ships, generateShips(star, star.numShips - star.ships.length)])
			: null;
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
		let color = `hsla(${star.hue + Math.random() * i}, ${
			Math.random > 0.5 ? 50 + Math.random() * i * 5 : 50 - Math.random() * i
		}%, ${Math.random > 0.5 ? 75 + Math.random() * i * 5 : 50 - Math.random() * i}%, ${
			Math.random > 0.5 ? Math.random() + 0.25 : Math.random() - 0.25
		})`;
		// console.log(`🚀 ~ file: index.svelte ~ line 418 ~ color ~ star.hue`, star.hue)
		let radius = Math.random() * 5;
		let orbit = star.radius + Math.random() * (i / 2 - i / 3) + 10;
		let ship = new Ship(radius, color, orbit);
		// console.log(`🚀 ~ file: index.svelte ~ line 426 ~ addShipToStar ~ ship`, ship)
		return ship;
	}

	function drawShips(star) {
		// console.log(`🚀 ~ file: index.svelte ~ line 87 ~ drawShips ~ star`, star);
		let x = 1,
			y = 1;
		let ships = star.ships;
		// console.log(`🚀 ~ file: index.svelte ~ line 86 ~ drawShips ~ ships`, ships);
		star['ships'].forEach((ship, i) => {
			theta = theta + ((i / 10000) * data.speed) / 50000;
			x = star.x + ship.orbit * Math.cos((theta + i) / data.orbitXmod); // adjustments to theta, like using i only on x or y, or i / 2, gives different results
			y = star.y + ship.orbit * Math.sin(theta + i / data.orbitYmod);
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
				// }, 1000 / data.tickRate);
			}, 1000 / data.fps);
		} else {
			return;
		}
	}

	function tickUpdateShips() {
		stars.forEach((star) => {
			star.update();
			adjustShipNumber(star);
		});
	}

	function gameLoop(timestamp) {
		counter++;
		let progress = timestamp - lastRender;
		lastRender = timestamp;
		animating ? update(progress) : null;
		requestAnimationFrame(gameLoop);
	}

	function update(progress) {
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
			this.ships = [];
			this.highlighted = false;
			this.active = false;
			this.destinationStarId = null;
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
				this.activeHighlight(ctx)
			}
			if (data.drawNumShips) {
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
			this.type < 3 && tick % 5 == 0 ? this.numShips++ : null;
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
			ctx.beginPath();

			// ctx.lineWidth = 1;
			ctx.arc(this.x, this.y, this.radius * 2.2, 0, 2 * Math.PI);
			ctx.fillStyle = `hsla(${this.hue + 20}, 100%, 50%, 1)`;
			ctx.fill();
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
		constructor(radius, color, orbit) {
			this.radius = radius;
			this.color = color;
			this.orbit = orbit;
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
