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
        stars = setStars(10)
        stars.forEach(star => {
            draw(star);

        })
	}

    function setStars(num) {
        stars = [];
        for (let i = 0; i < num; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 30,
                hue: Math.random() * 360
            });
        }
        return stars;

    }

	function drawDot() {
		theta = theta + Math.PI / 100;
		let x = cx + radius * Math.cos(theta);
		let y = cy + radius * Math.sin(theta);
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);
		ctx.save();
		ctx.beginPath();
		ctx.arc(x, y, 40, 0, 2 * Math.PI);
		ctx.fillStyle = `hsla(${frame }, 100%, 50%, ${bounceAlpha()})`;
		ctx.fill();

		ctx.restore();

	}

    function bounceAlpha() {
        alpha >= 1 ? modAlpha = -1 : null
        alpha <= 0 ? modAlpha = 1 : null
        let inc = .007 * modAlpha
        // console.log(`🚀 ~ file: index.svelte ~ line 67 ~ bounceAlpha ~ inc`, inc)
        alpha += inc; 

        return alpha.toFixed(3)
    }

	function draw(star) {
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${star.hue}, 50%, 50%, 1)`;
		ctx.fill();
	}
	// animate the circle
	function animate() {
		if (animating) {
			setTimeout(function () {
				requestAnimationFrame(animate);
                ctx.save()
				drawDot();
                // ctx.clearRect(0, 0, w, h);
                ctx.restore()
                // ctx.fillRect(0,0,w,h);
                ++frame;
			}, 1000 / data.fps);
		} else {
			init();
		}
	}

    
	class Vector {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
    }
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<canvas id="canvas" bind:this={canvas} />
