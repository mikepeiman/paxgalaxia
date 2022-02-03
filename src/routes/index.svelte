<script>
	import MetabrainCanvas from '$components/MetabrainCanvas.svelte';
	import { onMount } from 'svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
	});
	import { page } from '$app/stores';
	$: path = $page.url.pathname;
	import Icon from '@iconify/svelte';
import McMailingList from '$components/MCMailingList.svelte';
	let email = '';
	const icons = {
		fire1: 'wi:fire',
		fire2: 'vaadin:fire',
		fire3: 'mdi:fire',
		fire4: 'fa:fire',
		fire5: 'fa5:fire',
		fire6: 'fa5:fire-alt',
		fire7: 'el:fire',
		fire8: 'eva:fire',
		arrowCircle1: 'bi:arrow-down-circle-fill',
		arrowCircle2: 'eva:arrow-circle-down-fill',
		arrowCircleLeft2: 'eva:arrow-circle-left-fill',
		home: 'bx:bxs-home-heart',
		x: 'bx:bxs-x-square'
	};
	// let windowInnerWidth;
	// $: windowInnerWidth && resizeCanvases();

</script>

<!-- {#if mounted} -->
<!-- <svelte:window bind:innerWidth={windowInnerWidth} /> -->

<!-- <main
	class="homepage bg-black mt-20 flex flex-col self-center justify-items-center items-center w-full lg:text-sm lg:px-12 xl:px-24 2xl:w-4/5 2xl:px-12 3xl:w-3/4 3xl:px-36 mt-4 md:mt-20"
> -->
<div class="flex flex-col w-full h-full align-center justify-start text-center">
	<h1
		class="relative z-10 text-5xl mt-[12rem] md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-display"
	>
		MetaBrain
	</h1>
	<div
		class="flex relative z-10 flex-col relative py-8 my-4 w-auto mx-8 rounded-lg p-0 mx-6 md:p-8 md:mx-12  text-lg md:text-2xl lg:text-3xl xl:text-4xl font-montserrat"
	>
		<h2 class="p-2 relative z-10 ">One app to rule them all, one platform to unite them;</h2>
		<h2 class="p-2 relative z-10">
			One knowledge graph to learn and plan and prosper for a lifetime.
		</h2>
		<!-- Begin Mailchimp Signup Form -->
		<div class="w-full flex align-center justify-center">
			<!-- <div id="mc_embed_signup" class="w-1/2 py-6 border-t-2 border-b-2 border-sky-50"> -->
				<McMailingList />

		</div>
	</div>
	<div class="absolute z-0 w-screen h-screen top-0 left-0 ">
		<MetabrainCanvas {mounted} />
	</div>
</div>
<!-- </main> -->

<!-- {/if} -->
<style lang="scss">
	.statement {
		line-height: 1.25em;
		background: linear-gradient(black, black) padding-box,
			linear-gradient(
					120deg,
					var(--color-emerald-500) 10%,
					var(--color-amber-500) 25%,
					var(--color-rose-500) 50%,
					var(--color-fuchsia-500) 75%,
					var(--color-winterblues-400) 90%
				)
				border-box;
		border-radius: 1rem;
		border: 3px solid transparent;
		// box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.25);
		.author {
			color: var(--color-gray-300);
		}
	}

	:root {
		--color-1: var(--color-fuchsia-300);
		--color-2: var(--color-emerald-300);
		// --color-3: var(--color-sky-400);
		--color-3: var(--color-winterblues-400);
	}

	.color-1 {
		color: var(--color-1);
	}
	.color-2 {
		color: var(--color-2);
	}
	.color-3 {
		color: var(--color-3);
	}

	.articles-change {
		grid-template-areas:
			'intro posts'
			'separator separator';
	}

	.separator {
		@apply bg-gradient-to-l from-blue-400 via-electricindigo-300 to-winterblues-400;
	}
	.separator-2 {
		grid-area: separator;
	}

	.intro {
		grid-area: intro;
		// font-family: 'Nunito', sans-serif;
	}
	.intro-body {
		letter-spacing: 0.01em;
	}

	.posts-panel {
		grid-area: posts;
	}

	.project-card {
		display: flex;
		// grid-template-columns: 3fr minmax(45%, 2fr);
		grid-template-rows: 1.75rem 1fr;
		grid-template-areas:
			'tags'
			'details';
		.project-details {
			grid-area: details;
			display: flex;
		}
		.sketch {
			grid-area: sketch;
		}
	}

	.project-card-link {
		&:first-of-type {
			margin-left: 0;
		}
		&:last-of-type {
			margin-right: 0;
		}
	}

	ol {
		// font-family: 'Merriweather', serif;
		--list-counter-size: 1.5rem;
		counter-reset: intro-counter;
		list-style: none;
		position: relative;
		li {
			counter-increment: intro-counter;
			position: relative;
			&::marker {
				content: counter(intro-counter) '. ';
				color: var(--color-3);
				font-weight: 700;
				position: absolute;
				top: 0;
				left: calc(-1 * var(--list-counter-size) - 2rem);
				font-size: var(--list-counter-size);
				font-family: 'Newsreader';
			}
			.li-heading {
				font-family: 'Montserrat', sans-serif;
				position: relative;
				left: 0.75rem;
				color: var(--color-3);
				@apply font-semibold italic leading-none;
			}
		}
	}

	.projects-group {
		grid-template-columns: repeat(3, 1fr);
	}
	.project-tags {
		grid-area: tags;
		div {
			margin-left: 0px;
			margin-right: 4px;
		}
	}
</style>
