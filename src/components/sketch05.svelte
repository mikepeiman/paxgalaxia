<script>
	export let hidePanel = false;
	import CanvasSketchEditor from '$components/CanvasSketchEditor.svelte';
	import Slider from '$components/Slider.svelte';
	import ColorInput from '$components/ColorInput.svelte';
	import Checkbox from '$components/Checkbox-import.svelte';
	import { onMount } from 'svelte';
	import random from 'canvas-sketch-util/random.js';
	const data = {
		TITLE: 'Sketch05',
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
		dimensions: [1280, 1280]
	};
	let c, ctx, w, h;
	onMount(() => {
		c = document.getElementById('c');
		w = c.width = window.innerWidth;
		(h = c.height = window.innerHeight), (ctx = c.getContext('2d'));
		// starter.x = w / 2;
		// starter.y = h / 2;
		// setStartCoords();
		console.log(`🚀 ~ file: sketch05.svelte ~ line 37 ~ w `, w);
		console.log(`🚀 ~ file: sketch05.svelte ~ line 39 ~ h`, h);
		window.addEventListener('resize', function () {
			w = c.width = window.innerWidth;
			h = c.height = window.innerHeight;
			// starter.x = w / 2;
			// starter.y = h / 2;
			// setStartCoords();
			init();
		});
		init();
		anim();
	});

	let minDist = 60, // 10, 30
		maxDist = minDist * 1.2,
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
		width: data.minWidth,
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

		// if you want a cookie ;)
		ctx.lineCap = 'round';
	}

	function getColor(x, y, alphaFactor) {
        // console.log(`🚀 ~ file: sketch05.svelte ~ line 117 ~ getColor ~ alphaFactor`, alphaFactor)
		let finalFactor
		// finalFactor = y / h + frame * alphaFactor
		finalFactor = alphaFactor - Math.floor(alphaFactor)
        // console.log(`🚀 ~ file: sketch05.svelte ~ line 119 ~ getColor ~ finalFactor`, finalFactor)
		// return 'hsl( hue, 80%, 50% )'.replace('hue', (x / w) * 360 + frame);
		// return `hsla( ${((x / w) * 180 + frame + 5 * random.range(-1,1)) % 180 -  120}, 80%, 50%, ${y / h + frame * Math.random() * alphaFactor} )`;
		return `hsla( ${(x / w) * 180 + frame -  120}, 80%, 50%, ${finalFactor} )`;
	}

	function anim() {
		window.requestAnimationFrame(anim);
        ++intervalLogger
		++frame;

		ctx.shadowBlur = 0;
		ctx.fillStyle = 'rgba(0,0,0,.02)';
		ctx.fillRect(0, 0, w, h);
		ctx.shadowBlur = 0.5;

		// console.log(`🚀 ~ file: sketch05.svelte ~ line 124 ~ anim ~ lines`, lines)
		for (let i = 0; i < lines.length; ++i) {

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

		// if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
		if (lines.length < maxLines) {
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
			ctx.arc(starter.x, starter.y, initialWidth / 4, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function Line(parent) {
		this.x = parent.x | 0;
		this.y = parent.y | 0;
		this.width = parent.width
        this.reverse = parent.reverse
		// this.width = random.range(initialWidth, maxWidth);
		this.reverse = false;
		this.dirIndex = parent.dirIndex + 1;
		this.randomFactor = random.range(0.1, 1);
		do {
			let dir = dirs[(Math.random() * dirs.length) | 0];
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 164 ~ Line ~ dir`, dir)
			this.dirIndex++;
            this.bounce()
			// let dir = dirs[this.dirIndex % 6];
			this.vx = dir[0] * speed * this.randomFactor;
			this.vy = dir[1] * speed * this.randomFactor;
			if (this.x <= 0 || this.x >= w) {
				this.vx *= -1;
			}
			if (this.y <= 0 || this.y >= h) {
				this.vy *= -1;
			}
		} while (
			(this.vx === -parent.vx && this.vy === -parent.vy) ||
			(this.vx === parent.vx && this.vy === parent.vy)
		);

		// this.vx *= speed;
		// this.vy *= speed;

		// this.dist = Math.random() * (maxDist - minDist) + minDist;
		this.lineDist = minDist;
		this.hexDist = maxDist;

		// this.lineDist = minDist * Math.random() * 10;
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
        this.x <= 0 ? this.x = this.vx : this.x;
        this.x >= w ? this.x = w - this.vx : this.x;
        this.y <= 0 ? this.y = this.vy : this.y;
        this.y >= h ? this.y = h - this.vy : this.y;
	};
	Line.prototype.step = function () {
		let dead = false;

		let prevX = this.x,
			prevY = this.y;

		this.x += this.vx;
		this.y += this.vy;

		this.lineDist -= 1 * speed * this.randomFactor;
		this.hexDist -= 1 * speed * this.randomFactor;
		// this.x = (this.x + w) % w;
		// this.y = (this.y + h) % h;
		// kill if out of screen
		// if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) 
        this.bounce();
		//  dead = true;

		// make children :D
		// if (this.dist <= 0 && this.width > initialWidth) {
		if (this.lineDist <= 0) {
			let dir
			// dir = dirs[(Math.random() * dirs.length) | 0];
			// this.dirIndex ++
			Math.random > 0.5 && this.dirIndex >= 1 ? this.dirIndex-- : this.dirIndex++;
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 243 ~ anim ~ this.dirIndex`, this.dirIndex)
			dir = dirs[this.dirIndex % 6];
			// Math.random > 0.25 ? dir = dirs[(this.dirIndex) % 6] : dir = dirs[(this.dirIndex - 1) % 6];
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 245 ~ anim ~ this.dirIndex % 6`, this.dirIndex % 6)
			// console.log(`🚀 ~ file: sketch05.svelte ~ line 164 ~ Line ~ dir`, dir)
			// let newRand = random.range(0.5, 1.5);
			// this.vx = dir[0]* speed * newRand;
			// this.vy = dir[1]* speed * newRand;
			this.vx = dir[0] * speed * this.randomFactor;
			this.vy = dir[1] * speed * this.randomFactor;
			// this.vx = dirs[this.dirx % dirs.length] * speed;
			// this.vy = dirs[this.diry % dirs.length] * speed;
			// keep yo self, sometimes
			// this.dist = Math.random() * (maxDist - minDist) + minDist;
			// this.dist = random.range(minDist, maxDist) + minDist;
			// looking for consistent hexagons
			// this.lineDist = minDist;
			this.lineDist = (minDist * Math.random()) * 2;
			
            // add  children
			if (lines.length < maxLines) lines.push(new Line(this));
			if (lines.length < maxLines && Math.random() < 0.5) lines.push(new Line(this));
			// adjust first maxLines condition above 1 to create a pause in emitter while lines diminish

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
		this.width > maxWidth / 2 ? velFactor = this.width / 5 :velFactor = this.width * 5; // this is pretty slick, all angles used
		// this.width += velFactor / 3;
		// this.width += velFactor / 3;
		ctx.strokeStyle = ctx.shadowColor = getColor(this.x, this.y, this.randomFactor);
		ctx.beginPath();
		ctx.lineWidth = this.width;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(prevX, prevY);
		ctx.stroke();
		// if (this.width < initialWidth) {
		// 	dead = true;
		// }
		if (this.width > maxWidth) {
			this.reverse = true;
		} else if (this.width < minWidth) {
			this.reverse = false;
		}
		if (this.hexDist <= 0) {
			dead = true;
		}
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

<canvas id="c" class="w-full h-full" />

<!-- <CanvasSketchEditor {sketch} {settings} {data} {hidePanel}>
	<ColorInput label='Background' bind:value={data.background} />
	<ColorInput label='Foreground' bind:value={data.foreground} />
	<Slider label='Arc Length' bind:value={data.arclen} />
	<Slider label='Radius' bind:value={data.radius} />
	<Slider label='Angle' bind:value={data.angle} min={-Math.PI} max={Math.PI} />
	<Checkbox label='Outline' bind:checked={data.outline} />
	{#if data.outline}
		<Slider label='Line Width' bind:value={data.lineWidth} min=1 max=100 />
	{/if}
</CanvasSketchEditor> -->
