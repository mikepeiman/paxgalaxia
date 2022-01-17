<script>
	export let hidePanel = false;
	import Slider from '$components/Slider.svelte';
	import ColorInput from '$components/ColorInput.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import { onMount } from 'svelte';
	import random from 'canvas-sketch-util/random.js';
	import CanvasManager from '$components/CanvasManager.svelte';
	const data = {
		TITLE: 'Sketch06',
		outline: true,
		arclen: 0.5,
		angle: 0,
		radius: 0.33,
		background: '#527A9B',
		foreground: '#F4B9A7',
		lineWidth: 20,
		minDist: 20,
		maxDistFactor: 6,
		maxLines: 200,
		speed: 1,
		minWidth: 1,
		maxWidth: 10
	};
	$: maxDist = data.minDist * data.maxDistFactor;

	const settings = {
		scaleToView: true,
		dimensions: [1280, 1280]
	};
	let c, ctx, w, h;

	function getElementSizing() {
		let sideNav = document.getElementById('sideNav');
		let sideNavWidth = sideNav.offsetWidth;
		console.log(`🚀 ~ file: sketch05.svelte ~ line 31 ~ onMount ~ sideNavWidth`, sideNavWidth);
		let controlPanel = document.getElementById('controlPanel');
		let controlPanelWidth = controlPanel.offsetWidth;
		console.log(
			`🚀 ~ file: sketch05.svelte ~ line 34 ~ onMount ~ controlPanelWidth`,
			controlPanelWidth
		);
		let sketchLayout = document.getElementById('sketchLayout');
		let sketchLayoutWidth = sketchLayout.offsetWidth;
		console.log(
			`🚀 ~ file: sketch05.svelte ~ line 37 ~ onMount ~ sketchLayoutWidth`,
			sketchLayoutWidth
		);
		let canvasContainer = document.getElementById('canvasContainer');
		let canvasContainerWidth = canvasContainer.offsetWidth;
		console.log(
			`🚀 ~ file: sketch05.svelte ~ line 47 ~ getElementSizing ~ canvasContainerWidth`,
			canvasContainerWidth
		);
		let windowWidth = window.innerWidth;
		let calculatedLayoutRemaining = sketchLayoutWidth - sideNavWidth - controlPanelWidth;
		console.log(
			`🚀 ~ file: sketch05.svelte ~ line 48 ~ getElementSizing ~ calculatedLayoutRemaining`,
			calculatedLayoutRemaining
		);
		let calculatedWindowRemaining = windowWidth - sideNavWidth - controlPanelWidth;
		console.log(
			`🚀 ~ file: sketch05.svelte ~ line 50 ~ getElementSizing ~ calculatedWindowRemaining`,
			calculatedWindowRemaining
		);
		console.log(
			`🚀 ~ file: sketch05.svelte ~ line 49 ~ getElementSizing ~ windowWidth `,
			windowWidth
		);
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

	let minDist = 60, // 10, 30
		initialWidth = 1,
		minWidth = initialWidth,
		maxWidth = 5,
		maxLines = 175, // 100
		initialLines = 125, // 4
		speed = 2.25, // set this high and see what happens... maybe should decouple speed from size of lines
		lines = [],
		frame = 0,
		starter = {},
		timeSinceLast = 0,
		oldDirs = [
			// straight x, y velocity
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
			// diagonals, 0.7 = sin(PI/4) = cos(PI/4)
			[0.7, 0.7],
			[0.7, -0.7],
			[-0.7, 0.7],
			[-0.7, -0.7]
		],
		dirs = [
			[1, 0],
			[0.5, 0.866],
			[-0.5, 0.866],
			[-1, 0],
			[-0.5, -0.866],
			[0.5, -0.866]
		];
	$: starter = {
		// starting parent line, just a pseudo line
		x: random.range(0, w),
		y: random.range(0, h),
		vx: 0,
		vy: 0,
		width: random.range(initialWidth, data.maxWidth),
		reverse: false,
		dirIndex: 3,
		randomFactor: random.range(0.1, 1)
	};

	function setStartCoords() {
		// Math.random() < 0.5 ? (starter.x = 0) : (starter.x = w);
		starter.x = random.range(0, w);
		starter.y = random.range(0, h);
		// starter.randomFactor = random.range(0.5, 1.5);
		// starter.x = w / 2;
		// starter.y = h / 2;
	}

	function init() {
		lines.length = 0;
		for (let i = 0; i < initialLines; ++i) {
			setStartCoords();
			lines.push(new Line(starter));
		}

		ctx.fillStyle = '#222';
		ctx.fillRect(0, 0, w, h);
		ctx.lineCap = 'round';
	}

	function getColor(x, y, alphaFactor) {
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 117 ~ getColor ~ alphaFactor`, alphaFactor)
		let finalFactor;
		// finalFactor = y / h + frame * alphaFactor
		finalFactor = alphaFactor - Math.floor(alphaFactor);
		// console.log(`🚀 ~ file: sketch05.svelte ~ line 119 ~ getColor ~ finalFactor`, finalFactor)
		// return 'hsl( hue, 80%, 50% )'.replace('hue', (x / w) * 360 + frame);
		// return `hsla( ${((x / w) * 180 + frame + 5 * random.range(-1,1)) % 180 -  120}, 80%, 50%, ${y / h + frame * Math.random() * alphaFactor} )`;
		return `hsla( ${(x / w) * 180 + (Math.cos(frame) % 360)}, 50%, 50%, ${alphaFactor} )`;
	}

	function anim() {
		window.requestAnimationFrame(anim);

		++frame;

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

		if (lines.length < data.maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
			// if (lines.length < data.maxLines) {
			// && timesincelast > 10
			timeSinceLast = 0;
			setStartCoords();
			let line = new Line(starter);
			let randomDir = (Math.random() * dirs.length) | 0;
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 155 ~ anim ~ randomDir`, randomDir)
			let dir = dirs[randomDir];
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 155 ~ anim ~ dir`, dir)
			line.dirIndex = randomDir;
			// line.randomFactor = random.range(0.5, 1.5);
			lines.push(line);

			// cover the middle;
			ctx.fillStyle = ctx.shadowColor = getColor(starter.x, starter.y, Math.random());
			ctx.beginPath();
			// ctx.arc(starter.x, starter.y, initialWidth / 4, 0, Math.PI * 2);
			// ctx.fill();
		}
	}

	function Line(parent) {
		this.x = parent.x | 0;
		this.y = parent.y | 0;
		// this.width = parent.width / 1.25;
		// this.width = parent.width
		this.width = random.range(initialWidth, data.maxWidth);
		this.reverse = false;
		this.dirIndex = parent.dirIndex + 1;
		this.randomFactor = random.range(0.1, 1);
		do {
			let dir = dirs[(Math.random() * dirs.length) | 0];
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 164 ~ Line ~ dir`, dir)
			this.dirIndex++;
			// let dir = dirs[this.dirIndex % 6];
			// this.vx = dir[0] * data.speed * this.randomFactor;
			// this.vy = dir[1] * data.speed * this.randomFactor;
			this.vx = dir[0] * data.speed
			this.vy = dir[1] * data.speed 
			// if (this.x <= 0 || this.x >= w) {
			// 	this.vx *= -1;
			// }
			// if (this.y <= 0 || this.y >= h) {
			// 	this.vy *= -1;
			// }
		} while (
			(this.vx === -parent.vx && this.vy === -parent.vy) ||
			(this.vx === parent.vx && this.vy === parent.vy)
		);

		// this.vx *= data.speed;
		// this.vy *= data.speed;

		// this.dist = Math.random() * (maxDist - minDist) + minDist;
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
	};
	Line.prototype.step = function () {
		let dead = false;

		let prevX = this.x,
			prevY = this.y;

		this.x += this.vx;
		this.y += this.vy;

		this.lineDist -= 1 * data.speed 
		this.hexDist -= 1 * data.speed 
		// this.lineDist -= 1 * data.speed * this.randomFactor;
		// this.hexDist -= 1 * data.speed * this.randomFactor;
		// this.x = (this.x + w) % w;
		// this.y = (this.y + h) % h;
		// kill if out of screen
		if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.bounce();
		//  dead = true;

		// make children :D
		// if (this.dist <= 0 && this.width > initialWidth) {
		if (this.lineDist <= 0) {
			let dir;
			// dir = dirs[(Math.random() * dirs.length) | 0];
			// this.dirIndex ++
			Math.random > 0.5 && this.dirIndex >= 1 ? this.dirIndex-- : this.dirIndex++;
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 243 ~ anim ~ this.dirIndex`, this.dirIndex)
			dir = dirs[this.dirIndex % 6];
			// Math.random > 0.25 ? dir = dirs[(this.dirIndex) % 6] : dir = dirs[(this.dirIndex - 1) % 6];
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 245 ~ anim ~ this.dirIndex % 6`, this.dirIndex % 6)
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 164 ~ Line ~ dir`, dir)
			// let newRand = random.range(0.5, 1.5);
			// this.vx = dir[0]* data.speed * newRand;
			// this.vy = dir[1]* data.speed * newRand;
			this.vx = dir[0] * data.speed 
			this.vy = dir[1] * data.speed 
			// this.vx = dir[0] * data.speed * this.randomFactor;
			// this.vy = dir[1] * data.speed * this.randomFactor;
			// this.vx = dirs[this.dirx % dirs.length] * data.speed;
			// this.vy = dirs[this.diry % dirs.length] * data.speed;
			// keep yo self, sometimes
			// this.dist = Math.random() * (maxDist - data.minDist) + data.minDist;
			// this.dist = random.range(data.minDist, maxDist) + data.minDist;
			// looking for consistent hexagons
			// this.lineDist = data.minDist;
			// this.lineDist = data.minDist * Math.random() * 2;
			this.lineDist = data.minDist 
			// add 2 children
			if (lines.length < data.maxLines) lines.push(new Line(this));
			if (lines.length < data.maxLines * 2 && Math.random() < 0.5) lines.push(new Line(this));
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
		//  velFactor = this.vx * this.vy * this.vy; // this one does bridges up left down, a bit messy?
		this.width > data.maxWidth / 2 ? (velFactor = this.width / 5) : (velFactor = this.width * 5); // this is pretty slick, all angles used
		// this.width += velFactor / 3;
		// this.width += velFactor / 3;
		ctx.strokeStyle = ctx.shadowColor = getColor(this.x, this.y, 1);
		ctx.beginPath();
		ctx.lineWidth = this.width;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(prevX, prevY);
		ctx.stroke();
		// if (this.width < initialWidth) {
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
		// if(this.x < 0 || this.x > w || this.y < 0 || this.y > h){
		// 	dead = true
		// }
		if (dead) return true;
	};

	// const sketch = ({}) => {
	// 	return ({ context, width, height }) => {
	// 		const { background, foreground, radius, arclen, angle, lineWidth, outline, stroke } = data;
	// 		context.clearRect(0, 0, width, height);
	// 		context.fillStyle = background;
	// 		context.fillRect(0, 0, width, height);

	// 		const minDim = Math.min(width, height);
	// 		context.beginPath();
	// 		context.arc(width / 2, height / 2, minDim * radius, angle, Math.PI * 2 * arclen + angle);
	// 		context.fillStyle = foreground;
	// 		context.strokeStyle = foreground;
	// 		context.lineWidth = lineWidth;
	// 		if (outline) context.stroke();
	// 		else context.fill();
	// 	};
	// };
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
				min="1"
				max="500"
				step="5"
				color="text-sky-400"

			/>
			<Slider
				label="Number of lines"
				bind:value={data.maxLines}
				min="1"
				max="1000"
				step="1"

			/>
			<Slider
				label="Speed"
				bind:value={data.speed}
				min="1"
				max="1000"
				step="1"

			/>
			<Slider
				label="Maxdist Factor"
				bind:value={data.maxDistFactor}
				min="1"
				max="25"
				step="1"

			/>
			<Slider
				label="Min Width"
				bind:value={data.minWidth}
				min="1"
				max="100"
				step="1"

			/>
			<Slider
				label="Max Width"
				bind:value={data.maxWidth}
				min="1"
				max="100"
				step="1"

			/>
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
