<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('../blog.json');
		// console.log(`🚀 ~ file: posts index.svelte ~ line 4 ~ load ~ res`, res)
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};
</script>

<script>
	import Time from 'svelte-time';
	import IconChevronRight from '~icons/mdi/chevron-right';
	// import Sketch01Preview from './creative/sketch01-preview.svelte';
	// import Sketch02Preview from './creative/sketch02-preview.svelte';
	// import Sketch03Preview from './creative/sketch03-preview.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		// resizeCanvases();
	});
	// import { collections } from '@iconify/collections';
	// console.log(`🚀 ~ file: index.svelte ~ line 18 ~ collections`, collections.fa);

	import { page } from '$app/stores';
	$: path = $page.url.pathname;
	$: console.log(`🚀 ~ file: index.svelte ~ line 24 ~ path`, path);
	// import Posts from '$components/Posts.svelte';
	export let posts;
	let selectedPosts = posts?.slice(0, 3);
	console.log(`🚀 ~ file: index.svelte ~ line 4 ~ posts`, posts);
	let projects = [
		{
			name: 'MetaBrain.io',
			url: '#',
			tags: ['knowledge management app', 'GraphQL/DB', 'LMS'],
			desc: 'A knowledge tracking platform for life. Research, track, organize, curate, plan, analyze, schedule, do. One app to rule them all.',
			component: false
		},
		{
			name: 'Super Tic-Tac-Toe',
			url: 'https://super-tic-tac-toe.netlify.app/',
			tags: ['Svelte/Sapper', 'game', '(S)CSS'],
			desc: 'Inspired by pen-and-paper with my daughter. Tic-Tac-Toe on steroids. Choose an emoji, configure your gameboard and rules, and have at it with up to 8 players.',
			component: false
		},
		{
			name: 'Creative Coding',
			url: './creative/sketch05',
			tags: ['creative coding', 'generative art', 'javascript'],
			desc: 'Fulfilling a lifelong passion for beauty, and exploring the relationships between form, movement and number.'
			// component: Sketch03Preview
		}
	];

	let windowInnerWidth;
	// $: windowInnerWidth && resizeCanvases();
	function resizeCanvases() {
		let canvases = document.getElementsByTagName('canvas');
		console.log(`🚀 ~ file: index.svelte ~ line 58 ~ resizeCanvases ~ canvases`, canvases);

		let len = canvases.length;
		console.log(`🚀 ~ file: index.svelte ~ line 65 ~ resizeCanvases ~ len`, len);
		for (let i = 0; i < len; i++) {
			const canvas = canvases[i];
			console.log(`🚀 ~ file: index.svelte ~ line 68 ~ resizeCanvases ~ canvas `, canvas);
			let parent = canvas.parentElement;
			console.log(`🚀 ~ file: index.svelte ~ line 70 ~ resizeCanvases ~ parent`, parent);
			let width = parent.offsetWidth;
			console.log(`🚀 ~ file: index.svelte ~ line 72 ~ resizeCanvases ~ width`, width);
			let height = parent.offsetHeight;
			console.log(`🚀 ~ file: index.svelte ~ line 74 ~ resizeCanvases ~ height`, height);
			canvas.removeAttribute('style');
			canvas.setAttribute('style', `width: ${width}px; height: ${height}px;`);
			canvas.style.width = width;
			canvas.style.height = height;
		}
	}
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<main
	class="homepage bg-black flex flex-col self-center justify-items-center items-center w-full lg:text-sm lg:px-12 xl:px-24 2xl:w-4/5 2xl:px-12 3xl:w-3/4 3xl:px-36 mt-4 md:mt-20"
>
	<section class="articles md:grid md:articles-change w-full px-4 md:px-6 lg:px-0 self-center  p-3">
		<div class="intro flex flex-col text-lg md:pr-12 lg:pr-18 xl:pr-24 xl:text-xl">
			<h1 class="text-4xl lg:text-6xl font-bold font-display text-winterblues-300">
				Hi, I'm Mike.
			</h1>
			<p class="intro-body mt-3 font-light text-lg md:text-xl xl:text-2xl leading-snug md:leading-relaxed font-montserrat">
				I'm a creative software developer, and this is my professional blog. I love
				<span class="font-bold italic color-1">user experience</span> and design that helps realize
				human potential. I follow a
				<span class="font-bold italic color-2">first-principles</span>
				approach in my life and my work. Here are a few of my
				<span class="color-3 font-bold italic">design principles</span>:
			</p>

			<ol class="pl-7 mt-6 text-xl">
				<li class="mt-4">
					<h2 class="li-heading color-3 leading-none text-xl lg:text-2xl xl:mt-3 ">
						Never deny the user basic options.
					</h2>
					<p class="li-snippet text-base lg:text-lg mt-3 font-light ml-3 xl:text-xl">
						Users should be provided the means to <span class="italic color-1 font-medium"
							>customize the user interface</span
						> as much as possible.
					</p>
				</li>
				<li class="mt-4">
					<h2 class="li-heading color-3 leading-none lg:text-2xl xl:mt-9">
						Minimize barriers to action.
					</h2>
					<p class="li-snippet text-base lg:text-lg mt-3 font-light ml-3 xl:text-xl">
						The app (or website) is <span class="italic color-2 font-medium">for something</span>.
						Make it as
						<span class="italic color-1 font-medium">intuitive and efficient</span>
						as possible to <span class="italic color-2 font-medium">do that thing.</span>
					</p>
				</li>
				<li class="mt-4">
					<h2 class="li-heading color-3 leading-none lg:text-2xl xl:mt-9">
						Leverage visual intelligence.
					</h2>
					<p class="li-snippet text-base lg:text-lg mt-3 font-light ml-3 xl:text-xl">
						Augment words and iconography with <span class="italic color-1 font-medium">color</span>
						and structure - <span class="italic color-2 font-medium">draw the eye</span> to key points
						and relationships. Effectively use negative space, layout and structure, diagrams and images
						to communicate beyond mere words.
					</p>
				</li>
			</ol>
		</div>

		<!-- SEPARATOR -->
		<!-- <div
			class="separator seprator-1 mt-9 h-6 rounded-xl md:hidden bg-gradient-to-l from-blue-400 via-electricindigo-300 to-blue-400 w-full"
		/> -->
		<!-- SEPARATOR -->

		<div class="posts-panel flex flex-col self-center mt-12 mx-0 w-full md:mt-0">
			<div class="post w-full">
				<div
					class="view-more font-montserrat uppercase flex flex-row items-center justify-between -mb-4 border-t-[1px] lg:border-t-0 py-2 lg:pt-0 border-winterblues-400/[0.75]"
				>
					<h2
						class="recent-label uppercase font-montserrat text-winterblues-400/[0.75] text-base lg:text-lg"
					>
						Recent posts
					</h2>
					<div class="view-more relative">
						<a
							href="/blog"
							class="view-more font-montserrat text-base xl:text-lg pr-8 relative flex flex-row text-right transition text-winterblues-400/[0.75] hover:text-white"
							>View more articles
						</a>
						<div class="icon-wrapper -top-[3px] xl:-top-[1px]">
							<IconChevronRight class="icon-chevron" />
						</div>
						<div class="icon-wrapper -top-[3px] xl:-top-[1px]">
							<IconChevronRight class="icon-chevron" />
						</div>
						<div class="icon-wrapper -top-[3px] xl:-top-[1px]">
							<IconChevronRight class="icon-chevron" />
						</div>
					</div>
				</div>
				{#if selectedPosts}
				{#each selectedPosts as post}
					<a href={`/blog/${post.slug}`} class="no-underline relative">
						<div
							class="post-card transition duration-300  p-5 lg:p-7  rounded-md bg-gray-900 my-6 hover:bg-sky-800/[0.5] hover:-translate-x-2"
						>
							<!-- <figure class="absolute left-0 top-0 opacity-50">
							<img class="rounded-xl p-0" src={post.coverImage.url} alt={`Cover image for ${post.title}`} />
						</figure> -->
							<div
								class="post-title z-10 article-date p-0 pb-1 m-0 text-xs md:text-sm lg:pb-2 xl:pb-3 font-base font-fira  text-yellow-300/[0.75]"
							>
								<Time timestamp={post.date} />
							</div>
							<h1
								class="font-display font-bold text-winterblues-300 z-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-0 md:mb-1 lg:mb-2 xl:mb-3 -mt-1"
							>
								{post.title}
							</h1>
							<p
								class="font-fira font-light text-sky-200 tracking-wider z-10 text-sm md:text-base xl:text-lg"
							>
								{post.excerpt}
							</p>
						</div>
					</a>
				{/each}
				{/if}
			</div>
		</div>
	</section>

	<section
		class="flex flex-col w-full min-w-0 shrink self-center text-center items-center justify-center  px-8 lg:px-0"
	>
		<p
			class="statement text-3xl leading-relaxed font-bold italic text-center p-6 border-2 -mx-3 my-12 lg:mx-0 lg:mb-6 lg:border-none border-amber-500 rounded-lg w-auto xl:w-4/5 xl:px-16 xl:leading-loose lg:text-4xl 2xl:w-3/4 2xl:text-4xl self-center py-12 "
		>
			<span class="font-medium min-w-0"
				>&ldquo;If a system is to serve the creative spirit, it must be entirely comprehensible to a
				single individual.&rdquo;</span
			> <br /><span class="font-bold text-lg author uppercase ">Daniel H. H. Ingalls</span>
		</p>
	</section>

	<section class="projects min-w-0 shrink flex flex-col w-full justify-center px-4 md:px-6 lg:px-0">
		<div
			class="flex flex-row items-center justify-between mt-9 -mb-1 border-t-[1px] lg:border-t-0 py-2 border-amber-400/[0.75] "
		>
			<h2
				class="recent-label font-montserrat uppercase text-base lg:text-lg text-amber-400/[0.75] "
			>
				Selected Projects
			</h2>
			<!-- <div class="h-full w-0.5 bg-amber-400/[0.75]"></div> -->
			<h2
				class="view-more font-montserrat text-base xl:text-lg pr-4 relative flex flex-row transition text-amber-400/[0.75] hover:text-white"
			>
				<!-- -mb-3 xl:-mb-0 md:-mb-2  justify-end-->
				<a href="/creative" class="view-more offset-4 pr-4 no-underline uppercase text-right"
					>View more projects</a
				>
				<div class="icon-wrapper -top-[3px] xl:-top-[1px]">
					<IconChevronRight class="icon-chevron" />
				</div>
				<div class="icon-wrapper -top-[3px] xl:-top-[1px]">
					<IconChevronRight class="icon-chevron" />
				</div>
				<div class="icon-wrapper -top-[3px] xl:-top-[1px]">
					<IconChevronRight class="icon-chevron" />
				</div>
			</h2>
		</div>
		<div class="projects-group min-w-0 shrink  md:grid w-full flex flex-col mb-12">
			{#each projects as project}
				<a href={`${project.url}`} class="project-card-link no-underline flex my-3 md:mx-3" target="_blank">
					<!-- make a 'projects' directory for these -->
					<div
						class="project-card card rounded-md transition-all  bg-gray-900 hover:bg-sky-800/[0.5] flex flex-col  md:flex-col-reverse md:justify-between lg:flex-col lg:justify-start p-5 lg:p-7 rounded-md  hover:-translate-x-2 md:hover:-translate-y-2 md:hover:translate-x-0"
					>
						<div class="text-xs flex flex-row project-tags">
							<!-- {#each project.tags as tag}
								<span
									class="project-tag -ml-2 mr-4 mb-4 bg-winterblues-300 bg-opacity-30 rounded-md text-xs font-thin p-1"
									>{tag}</span
								>
							{/each} -->
							{#if project.tags}
								<div class="mb-4 -mt-2 lg:mb-4 lg:-mt-2 md:mb-2 md:mt-2 space-x-2 flex flex-wrap justify-start align-start">
									{#each project.tags as tag}
										<div
											class="project-tag font-light font-montserrat mt-1 whitespace-nowrap px-2 py-1 rounded bg-fuchsia-900/[0.5] text-yellow-300/[0.75]"
											>{tag}</div
										>
									{/each}
								</div>
							{/if}
						</div>
						<div class="project-details flex flex-col ">
							<h1
								class="font-display font-bold text-amber-200 z-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-0 md:mb-1 lg:mb-2 xl:mb-3 -mt-1"
							>
								{project.name}
							</h1>
							<p
								class="font-fira font-light text-sky-200 tracking-wider mt-2 text-sm md:text-base xl:text-lg "
							>
								{project.desc}
							</p>
						</div>
						<!-- <div class="sketch rounded-lg pl-2">
							<svelte:component this={project.component} />
						</div> -->
					</div>
				</a>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	// @import url('https://fonts.googleapis.com/css2?family=Allura&family=Bad+Script&family=Coda:wght@400;800&family=Dancing+Script&family=Forum&family=Gideon+Roman&family=Great+Vibes&family=Karla:ital,wght@0,200;0,300;1,200;1,300&family=Lemonada:wght@300;400;500&family=Lobster&family=Merriweather:ital,wght@0, 100;0,300;0,500;0,700;0,900;1,100;1,300;1,500;1,700;1,900&family=Monoton&family=Montserrat:ital,wght@0,100;0,300;0,500;0,800;1,100;1,300;1,500;1,800&family=Outfit:wght@200;500&family=Overlock:ital,wght@0,400;0,700;1,400;1,700&family=Staatliches&display=swap');

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
	// 100,200,300,400,500,600,700,800,900

	.homepage {
		// font-family: 'Be Vietnam Pro', sans-serif;
		// font-family: 'Fira Sans', sans-serif;
		// font-family: 'Newsreader', serif;
		// font-family: 'Noto Sans Display', sans-serif;
		// font-family: 'Nunito', sans-serif;
		// font-family: 'Sarabun', sans-serif;
		// font-family: 'Source Sans 3', sans-serif;
		// font-family: 'Source Serif 4', sans-serif;
		// font-family: 'Vollkorn', serif;
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

	a {
		// @apply underline underline-offset-4  decoration-winterblues-500;
	}

	.icon-wrapper {
		position: absolute;
		// padding-top: 2px;
		@apply -mr-4 transition right-0 text-2xl;
		&:nth-of-type(1) {
			@apply text-winterblues-400 right-6 transition delay-300;
		}
		&:nth-of-type(2) {
			@apply text-winterblues-600 right-4 transition delay-200;
		}
		&:nth-of-type(3) {
			@apply text-winterblues-800 right-2 transition delay-100;
		}
	}
	.view-more {
		transition: all;
		transition-delay: 0.1s;
		&:hover {
			transition-delay: 0s;
			.icon-wrapper {
				&:nth-of-type(1) {
					@apply text-winterblues-200 transition delay-100;
				}
				&:nth-of-type(2) {
					@apply text-winterblues-400 transition delay-200;
				}
				&:nth-of-type(3) {
					@apply text-winterblues-600 transition delay-300;
				}
			}
		}
	}
	.projects {
		.icon-wrapper {
			@apply -mr-4 transition text-2xl;
			&:nth-of-type(1) {
				@apply text-orange-400 transition  delay-300;
			}
			&:nth-of-type(2) {
				@apply text-orange-600 transition  delay-200;
			}
			&:nth-of-type(3) {
				@apply text-orange-800 transition  delay-100;
			}
		}
		.view-more {
			transition: all;
			transition-delay: 0.1s;
			&:hover {
				transition-delay: 0s;
				.icon-wrapper {
					&:nth-of-type(1) {
						@apply text-orange-200 transition delay-100;
					}
					&:nth-of-type(2) {
						@apply text-orange-400 transition delay-200;
					}
					&:nth-of-type(3) {
						@apply text-orange-600 transition delay-300;
					}
				}
			}
		}
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

	.statement {
		// font-family: 'Bad Script', cursive;
		// font-family: 'Coda', cursive;
		// font-family: 'Forum', cursive;
		// font-family: 'Gideon Roman', cursive;
		// font-family: 'Karla', sans-serif;
		// font-family: 'Merriweather', serif;
		font-family: 'Montserrat', sans-serif;
		// font-family: 'Outfit', sans-serif;
		// font-family: 'Overlock', cursive;
		// font-family: 'Staatliches', cursive;
		// font-family: 'Be Vietnam Pro', sans-serif;
		// font-family: 'Montserrat', sans-serif;
		// font-family: 'Nunito', sans-serif;
		// font-family: 'Sarabun', sans-serif;
		// font-family: 'Source Serif 4', sans-serif;
		// font-family: 'Noto Sans Display', sans-serif;
		// font-family: 'Source Sans 3', sans-serif;
		// font-family: 'Karla', sans-serif;
		// font-family: 'Fira Sans', sans-serif;
		// font-family: 'Newsreader', serif;
		// font-family: 'Vollkorn', serif;
		// font-family: 'Merriweather', serif;
		//  font-family: 'Overlock', cursive;
		font-weight: 600;
		// font-weight: 500;
		// font-weight: 700;
		// font-weight: 900;
		// color: var(--color-winterblues-400);
		// color: white;
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
		// linear-gradient(
		// 		120deg,
		// 		rgba(131, 58, 180, 1) 10%,
		// 		rgba(47, 174, 177, 1) 22%,
		// 		rgba(253, 29, 29, 1) 50%,
		// 		rgba(191, 252, 55, 1) 72%,
		// 		rgba(252, 176, 69, 1) 90%
		// 	)
		// 	border-box;
		// linear-gradient(to right, var(--color-winterblues-600), var(--color-deepreds-900)) border-box;
		border-radius: 1rem;
		border: 3px solid transparent;
		// box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.25);
		.author {
			color: var(--color-gray-300);
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
