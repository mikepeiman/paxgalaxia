<script>
	export let hidePanel = false;
	import Slider from '$components/Slider.svelte';
	import ColorInput from '$components/ColorInput.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import OptionSelect from '$components/OptionSelect.svelte';
	import { onMount } from 'svelte';
	import random from 'canvas-sketch-util/random.js';
	import CanvasManager from '$components/CanvasManager.svelte';
	const data = {
		TITLE: 'Sketch05',
		fps: 60,
		minDist: 20,
		maxDistFactor: 6,
		initialLines: 0,
		maxLines: 100,
		speed: 3,
		minWidth: 1,
		maxWidth: 4,
		lineBirthFactor: 0.25,
		randomColors: false,
		colorFunctions: [
			{ value: 0, label: 'original' },
			{ value: 1, label: '2' },
			{ value: 2, label: '3' },
			{ value: 3, label: '4' },
			{ value: 4, label: '5' },
			{ value: 5, label: '6' },
			{ value: 6, label: '7' },
		],
		colorFunctionsIndex: 0
	};

	let lines = [],
		frame = 0,
		starter = {},
		timeSinceLast = 0;

		$: lines
	const dirs = [
		{ x: 1, y: 0, angle: 0 },
		{ x: 0.5, y: 0.866, angle: 60 },
		{ x: -0.5, y: 0.866, angle: 120 },
		{ x: -1, y: 0, angle: 180 },
		{ x: -0.5, y: -0.866, angle: 240 },
		{ x: 0.5, y: -0.866, angle: 300 }
	];

	$: starter = {
		// starting parent line, just a pseudo line
		x: w / 2,
		y: h / 2,
		vx: 1,
		vy: 0.5,
		width: random.range(data.minWidth, data.maxWidth),
		reverse: false,
		dirIndex: Math.floor(random.range(0, 6)),
		randomFactor: random.range(0.1, 1)
	};

	// some interesting settings:
	//  82,31,3,4,1,10
	$: maxDist = data.minDist * data.maxDistFactor;

	const settings = {
		scaleToView: true,
		dimensions: [1280, 1280]
	};
	let c, ctx, w, h;
	let logCounter = 0;
	function getElementSizing() {
		let sideNav = document.getElementById('sideNav');
		let sideNavWidth = sideNav.offsetWidth;
		let controlPanel = document.getElementById('controlPanel');
		let controlPanelWidth = controlPanel.offsetWidth;
		let sketchLayout = document.getElementById('sketchLayout');
		let sketchLayoutWidth = sketchLayout.offsetWidth;
		let canvasContainer = document.getElementById('canvasContainer');
		let canvasContainerWidth = canvasContainer.offsetWidth;
		let windowWidth = window.innerWidth;
		let calculatedLayoutRemaining = sketchLayoutWidth - sideNavWidth - controlPanelWidth;
		let calculatedWindowRemaining = windowWidth - sideNavWidth - controlPanelWidth;

		return { calculatedLayoutRemaining, calculatedWindowRemaining };
	}
	onMount(() => {
		let { calculatedLayoutRemaining, calculatedWindowRemaining } = getElementSizing();
		c = document.getElementById('c');
		let canvasContainer = document.getElementById('canvasContainer');
		let canvasContainerWidth = canvasContainer.offsetWidth;

		if (calculatedWindowRemaining < calculatedLayoutRemaining) {
			w = c.width = canvasContainer.width = calculatedWindowRemaining;
		} else if (canvasContainerWidth > calculatedLayoutRemaining) {
			w = c.width = calculatedLayoutRemaining;
		} else {
			w = c.width = canvasContainerWidth;
		}
		h = c.height = sketchLayout.offsetHeight;
		ctx = c.getContext('2d');

		window.addEventListener('resize', function () {
			let { calculatedLayoutRemaining, calculatedWindowRemaining } = getElementSizing();
			let canvasContainer = document.getElementById('canvasContainer');
			let canvasContainerWidth = canvasContainer.offsetWidth;

			if (calculatedWindowRemaining < calculatedLayoutRemaining) {
				w = c.width = canvasContainer.width = calculatedWindowRemaining;
			} else if (canvasContainerWidth > calculatedLayoutRemaining) {
				w = c.width = calculatedLayoutRemaining;
			} else {
				w = c.width = canvasContainerWidth;
			}

			h = c.height = sketchLayout.offsetHeight;
			init();
		});
		init();
		anim();
	});
	function makePositive(n) {
		return n < 0 ? (n = n * -1) : (n = n);
	}

	function setStartCoords() {
		// Math.random() < 0.5 ? (starter.x = 0) : (starter.x = w);
		// let modX = Math.random() * Math.floor(w / data.minDist) * data.minDist;
		// let modY = Math.random() * Math.floor(h / data.minDist) * data.minDist;
		// starter.x = modX
		// starter.y = modY

		let evenSpacingArrayX = [],
			evenSpacingArrayY = [];
		let evenX = Math.floor(w / data.minDist);
		let evenY = Math.floor(h / data.minDist);
		evenSpacingArrayX = Array.from(Array(evenX), (x, i) => i * data.minDist);
		evenSpacingArrayY = Array.from(Array(evenY), (x, i) => i * data.minDist);
		starter.x = random.pick(evenSpacingArrayX);
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 153 ~ setStartCoords ~ starter.x`, starter.x)
		starter.y = random.pick(evenSpacingArrayY);
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 155 ~ setStartCoords ~ starter.y`, starter.y)
		// starter.x = random.range(0, w);
		// starter.y = random.range(0, h);
		// starter.randomFactor = random.range(0.5, 1.5);
		// starter.x = w / 2;
		// starter.y = h / 2;
		starter.dirIndex = Math.floor(random.range(0, 6));
	}

	function init() {
		lines.length = 0;

		// console.log(`🚀 ~ file: sketch05.svelte ~ line 160 ~ init ~ evenSpacingArrayX`, evenSpacingArrayX)
		for (let i = 0; i < data.initialLines; ++i) {
			setStartCoords();
			let line = new Line(starter);
			line.colorFunction = random.pick(data.colorFunctions);
			lines.push(line);
		}

		ctx.fillStyle = '#222';
		ctx.fillRect(0, 0, w, h);
		ctx.lineCap = 'round';
	}

	function getColor(idx, x, y, alphaFactor) {
		
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 117 ~ getColor ~ alphaFactor`, alphaFactor)
		// let finalFactor;
		// finalFactor = y / h + frame * alphaFactor
		// finalFactor = alphaFactor - Math.floor(alphaFactor);
		alphaFactor = 1;
		const colorFunctions = [
			`hsla( ${(x / w) * 360 + frame}, 80%, 50%, 0.5 )`,
			`hsla( ${(x / w) * 180 + frame - 120}, 80%, 50%, ${
				y / h + frame * Math.random() * alphaFactor
			} )`,
			`hsla( ${(x / w) * 180 + frame - 120}, 80%, 50%, ${Math.cos(x) / Math.cos(y)} )`,
			`hsla( ${(x / w) * 180 + frame - 120}, 80%, 50%, ${frame / 2 - Math.floor(frame / 2)} )`,
			`hsla( ${(x / w) * 180 + frame - 120}, 80%, 50%, ${frame + 1 - (frame + 1) / frame} `,
			`hsla( ${(x / w + y) * 180 + frame / 30}, 50%, 50%, ${alphaFactor} )`,
			`hsla( ${(x / w + y / h) * frame}, 50%, 50%, ${alphaFactor} )`,
			`hsla( ${(x / w + y / h) * frame}, 50%, 50%, ${alphaFactor} )`,
		];
		let thisColor
		// thisColor = random.pick(colorFunctions);
		data.randomColors ? thisColor = colorFunctions[idx] : thisColor = colorFunctions[data.colorFunctionsIndex]
        // console.log(`🚀 ~ file: sketch05.svelte ~ line 187 ~ getColor ~ line.colorFunction`, line.colorFunction)
		// Math.random() > 0.5 ? thisColor = colorFunctions[data.colorFunctionsIndex] : thisColor = colorFunctions[(data.colorFunctionsIndex + 1) % colorFunctions.length];
		return thisColor;
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 174 ~ getColor ~ thisColor`, thisColor)
	}

	function anim() {
		setTimeout(function () {
			requestAnimationFrame(anim);
		}, 1000 / data.fps);
		// window.requestAnimationFrame(anim);

		++frame;
		++logCounter;
		if (logCounter > 1000) {

			console.log(`🚀 ~ file: sketch05.svelte ~ line 191 ~ anim ~ lines`, lines);
			logCounter = 0;
		}

		ctx.shadowBlur = 0;
		ctx.fillStyle = 'rgba(0,0,0,.02)';
		ctx.fillRect(0, 0, w, h);
		ctx.shadowBlur = 0.5;

		// console.log(`🚀 ~ file: sketch05.svelte ~ line 124 ~ anim ~ lines`, lines)
		for (let i = 0; i < lines.length; ++i) {
			// lines[i].bounce()
			// lines[i].width *= 0.995;
			lines[i].reverse ? (lines[i].width *= 0.998) : (lines[i].width *= 1.002);
			// lines.splice(i, 1);
			// --i;
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 125 ~ anim ~ lines[i]`, lines[i])
			if (lines[i].step()) {
				// if true it's dead

				lines.splice(i, 1);
				--i;

				// i += 10;
				// i -= 10;
			}
		}
		// spawn new

		++timeSinceLast;

		if (lines.length < data.maxLines) {
			// if (lines.length < data.maxLines) {
			// && timesincelast > 10
			timeSinceLast = 0;
			setStartCoords();
			let line = new Line(starter);
			line.dirIndex = Math.floor(random.range(0, 6));
			line.colorFunction = random.pick(data.colorFunctions);
			lines.push(line);

			// cover the middle;
			ctx.fillStyle = ctx.shadowColor = getColor(line.colorFunction.value, starter.x, starter.y, Math.random());
			ctx.beginPath();
			// ctx.arc(starter.x, starter.y, data.minWidth / 4, 0, Math.PI * 2);
			// ctx.fill();
		}
	}

	function Line(parent) {
		this.x = parent.x | 0;
		this.y = parent.y | 0;
		// this.width = parent.width / 1.25;
		this.width = parent.width | 1;
		// this.width = random.range(data.minWidth, data.maxWidth);
		this.reverse = false;
		this.dirIndex = parent.dirIndex;
		this.colorFunction = random.pick(data.colorFunctions);
		this.randomFactor = random.range(0.1, 1);
		do {
			// Math.random() > 0.5 ? this.dirIndex++ : this.dirIndex--;
			this.dirIndex = ++this.dirIndex % 6;
			this.dirIndex = makePositive(this.dirIndex);
			let dir = dirs[this.dirIndex];
			// this.vx = dir.x * data.speed * this.randomFactor;
			// this.vy = dir.y * data.speed * this.randomFactor;
			this.vx = dir.x * data.speed;
			this.vy = dir.y * data.speed;
		} while (
			(this.vx === -parent.vx && this.vy === -parent.vy) ||
			(this.vx === parent.vx && this.vy === parent.vy)
		);

		this.lineDist = data.minDist;
		this.hexDist = maxDist;

		// this.lineDist = data.minDist * Math.random() * 10;
		// this.hexDist = maxDist * Math.random() * 10;
	}

	Line.prototype.wrap = function () {
		this.x = (this.x + w) % w;
		this.y = (this.y + h) % h;
	};

	Line.prototype.bounce = function () {
		if (this.x <= 0 || this.x >= w) {
			this.vx *= -1;
		}
		if (this.y <= 0 || this.y >= h) {
			this.vy *= -1;
		}
		this.dirIndex = (this.dirIndex + 3 )% 6
        // this.x <= 0 ? this.x = this.vx : this.x;
        // this.x >= w ? this.x = w - this.vx : this.x;
        // this.y <= 0 ? this.y = this.vy : this.y;
        // this.y >= h ? this.y = h - this.vy : this.y;
	};
	Line.prototype.step = function () {
		let dead = false;
		let prevX = this.x,
			prevY = this.y;

		this.dirIndex = makePositive(this.dirIndex % 6);
		// let lineDist = Math.sqrt(Math.pow(makePositive(this.x - (this.x + this.vx)), 2) + Math.pow(makePositive(this.y - (this.y + this.vy)), 2));
		// this return a value almost exactly the same as speed

		this.x += this.vx;
		this.y += this.vy;

		// this.lineDist -= lineDist
		this.lineDist -= data.speed;
		// this.hexDist -= lineDist
		this.hexDist -= data.speed;

		// kill if out of screen
		if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.bounce();
		// if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) dead = true;
		//  dead = true;

		// make children :D
		// if (this.dist <= 0 && this.width > data.minWidth) {
		if (this.lineDist <= 0) {
			// if (this.lineDist < 0) {
			// 	this.lineDist, this.hexDist, this.x, this.y, this.vx, this.vy, dirs[this.dirIndex];
			// 	// console.log(`🚀 ~ file: sketch05.svelte ~ line 329 ~ anim ~ this.lineDist, this.hexDist, this.x, this.y,	this.vx, this.vy, dirs[this.dirIndex]`, this.lineDist, this.hexDist, this.x, this.y,	this.vx, this.vy, dirs[this.dirIndex])
			// 	// console.log(`🚀 ~ file: sketch05.svelte ~ line 329 ~ anim ~ this.x, this.y,	this.vx, this.vy, dirs[this.dirIndex]`, this.x, this.y,	this.vx, this.vy, dirs[this.dirIndex])
			// 	// console.log(`🚀 ~ file: sketch05.svelte ~ line 327 ~ anim ~ this.lineDist < 0`, this.lineDist)
			// }
			let dir;
			// dir = dirs[(Math.random() * dirs.length) | 0];
			this.dirIndex++;
			Math.random > 0.5 ? ++this.dirIndex : --this.dirIndex;
			this.dirIndex = makePositive(this.dirIndex) % 6;
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 243 ~ anim ~ this.dirIndex`, this.dirIndex)
			dir = dirs[this.dirIndex];
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 352 ~ anim ~ this.dirIndex`, this.dirIndex)
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 352 ~ anim ~ dir`, dir)
			this.vx = dir.x * data.speed;
			this.vy = dir.y * data.speed;
			this.lineDist = data.minDist;
			this.hexDist = data.minDist;
			// add 2 children
			if (lines.length < data.maxLines) lines.push(new Line(this));
			// if (lines.length < data.maxLines && Math.random() < 0.5) lines.push(new Line(this));
			if(Math.random() < data.lineBirthFactor){

				lines.push(new Line(this));
				// remove a random line from lines array
				let index = (Math.random() * lines.length) | 0;
				lines.splice(index, 1);
			}

			// adjust first data.maxLines condition above 1 to create a pause in emitter while lines diminish

			// kill the poor thing
			// if (Math.random() < 0.5) dead = true;
			// dead = true;
		}
		let velFactor = 1;
		//  velFactor = ((this.vx * this.vy) + 1) * .5;
		//  velFactor = this.vx * this.vy;
		// velFactor = this.vx + this.vy + this.x + this.y;
		//  velFactor = Math.random() < 0.5 ? this.vx - this.vy : this.vy - this.vx; // THIS ONE is super unexpected! dashed lines
		//  velFactor = this.vx < 0.5 ? this.vx - this.vy : this.vy - this.vx;
		// velFactor = this.vy < 0.5 ? this.vx - this.vy : this.vy - this.vx;
		//  velFactor = this.vx - this.vy * this.vx; // this one does up-right, minimal effect
		 velFactor = this.vx * this.vy * this.vy; // this one does bridges up left down, a bit messy?
		// this.width > data.maxWidth / 2 ? (velFactor = this.width / 5) : (velFactor = this.width * 5); // this is pretty slick, all angles used
		// this.width += velFactor / 3;
		// this.width += velFactor / 3;
		ctx.strokeStyle = ctx.shadowColor = getColor(this.colorFunction.value, this.x, this.y, velFactor);
		ctx.beginPath();
		ctx.lineWidth = this.width;
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 368 ~ anim ~ this.width`, this.width)
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(prevX, prevY);
		ctx.stroke();
		// if (this.width < data.minWidth) {
		// 	dead = true;
		// }
		if (this.width > data.maxWidth) {
			this.reverse = true;
		} else if (this.width < data.minWidth) {
			this.reverse = false;
		}
		if (this.hexDist <= 0) {
			dead = true;
		}
		// if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
		// 	dead = true;
		// }
		if (dead) return true;
	};
</script>

<div class="flex h-full w-full sketch">
	<div id="canvasContainer">
		<canvas id="c" />
	</div>
	<div class="controls flex flex-col p-4" id="controlPanel">
		<CanvasManager {settings} {data} {hidePanel}>
			<Slider
				label="Min Distance"
				bind:value={data.minDist}
				min="4"
				max="1200"
				step="4"
				color="text-sky-400"
			/>
			<Slider label="Number of lines" bind:value={data.maxLines} min="10" max="500" step="10" />
			<Slider label="Speed" bind:value={data.speed} min=".2" max="20" step=".2" />
			<Slider label="Line Birth" bind:value={data.lineBirthFactor} min=".1" max="1" step=".1" />
			<Slider label="FPS" bind:value={data.fps} min="1" max="60" step="1" />
			<Slider label="Maxdist Factor" bind:value={data.maxDistFactor} min="1" max="50" step="1" />
			<Slider label="Min Width" bind:value={data.minWidth} min="1" max="100" step="1" />
			<Slider label="Max Width" bind:value={data.maxWidth} min="1" max="100" step="1" />
			<Checkbox label="Random color functions?" bind:checked={data.randomColors} />
			<OptionSelect items={data.colorFunctions} bind:selected={data.colorFunctionsIndex} />
		</CanvasManager>
	</div>
</div>

<style global lang="scss">
	.sketch {
		grid-area: sketch;
	}

	.controls {
		grid-area: controls;
	}
</style>
