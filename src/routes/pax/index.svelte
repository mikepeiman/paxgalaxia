<script>
	// import onMoun
	import { onMount } from 'svelte';
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
	// initialize context 2d
    let counter = 0;
	let radius = Math.min(w, h) / 4;
	let data = {
		fps: 60
	};
	onMount(() => {
		mounted = true;
		init();
	});
	function onClick() {
		console.log('click');
		// drawDot();
		animating ? (animating = false) : (animating = true);
		animating ? animate() : null;
	}

	async function init() {
		canvas = document.getElementById('canvas');
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;
		cx = w / 2;
		cy = h / 2;
		radius = Math.min(w, h) / 4;
		canvas.style.backgroundColor = '#222';
		canvas.style.cursor = 'pointer';
		ctx = canvas.getContext('2d');
        ctx.fillStyle = "#222"
		ctx.fillRect(0, 0, w, h);
		canvas.addEventListener('click', onClick);
		stars = await generateStars(10);
		stars.forEach((star) => {
			draw(star);
		});
	}

	async function generateStars(num) {
		stars = [];
		for (let i = 0; i < num; i++) {
            let star = new Star(Math.random() * w, Math.random() * h, Math.random() * 30 + 10, Math.random() * 360, Math.random() * 50)
            star['ships'] = await generateShips(star)
            stars = [...stars, star];
            // stars.push(star);
			// stars.push({
			// 	x: Math.random() * w,
			// 	y: Math.random() * h,
			// 	radius: Math.random() * 30 + 10,
			// 	hue: Math.random() * 360,
			// 	ships: Math.ceil(Math.random() * 30)
			// });
		}
		return stars;
	}

    function generateShips(star) {
        console.log(`🚀 ~ file: index.svelte ~ line 76 ~ generateShips ~ star`, star)
        let ships = [];
        for (let i = 0; i < star.numShips; i++) {
            let color = `hsla(${star.hue + Math.random() * i}, ${Math.random > 0.5 ? 50 + Math.random() * i * 5 : 50 - Math.random() * i}%, ${Math.random > 0.5 ? 75 + Math.random() * i * 5 : 50 - Math.random() * i}%, ${Math.random > 0.75 ?  Math.random() + .25 : Math.random() - .25})`
            let ship = new Ship(Math.random() * 5, color, Math.random() * 5)
            console.log(`🚀 ~ file: index.svelte ~ line 79 ~ generateShips ~ ship`, ship)
            ships = [...ships, ship]
        }
        star.ships = ships;
        return ships;
    }

	function drawShips(star) {
        console.log(`🚀 ~ file: index.svelte ~ line 87 ~ drawShips ~ star`, star)
        let x = 1, y = 1
        let ships = star.ships
        console.log(`🚀 ~ file: index.svelte ~ line 86 ~ drawShips ~ ships`, ships)
        star['ships'].forEach((ship, i) => {
            theta = theta +  i / 50000;
            x = star.x + (star.radius + 10) * Math.cos(theta + i /2 ); // adjustments to theta, like using i only on x or y, or i / 2, gives different results
            y = star.y + (star.radius + 10) * Math.sin(theta + i * 2);
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = ship.color;
            ctx.fill();
        })
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
        counter++
		if (animating) { //  && counter < 10
			setTimeout(function () {
				requestAnimationFrame(animate);
				ctx.fillStyle = '#222';
				ctx.fillRect(0, 0, w, h);
				ctx.save();
				stars.forEach((star) => {
                    draw(star)
					drawShips(star);
				});

				// ctx.clearRect(0, 0, w, h);
				ctx.restore();
				// ctx.fillRect(0,0,w,h);
				++frame;
			}, 1000 / data.fps);
		} else {
            return
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
<canvas id="canvas" bind:this={canvas} />
