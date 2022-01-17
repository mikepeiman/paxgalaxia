<script context="module">
	export const load = async ({ fetch, page: { params } }) => {
		const { slug } = params;
		const res = await fetch(`/blog/${slug}.json`);
		console.log(`🚀 ~ file: [slug].svelte ~ line 5 ~ load ~ res`, res);
		if (res.ok) {
			const { post } = await res.json();
			console.log(`🚀 ~ file: [slug].svelte ~ line 8 ~ load ~ post`, post);
			return { props: { post } };
		}
	};
</script>

<script>
	// import Posts from "$components/Posts.svelte";
	import { onMount } from 'svelte';
	export let post;
	const {
		title,
		date,
		tags,
		article: { html },
		coverImage
	} = post;
	onMount(() => {
		// let body = document.getElementsByClassName('blog')[0];
		// body.classList.add('blog-post-fancy-bg');
	});
	// author: { name, authorTitle, picture },
	// 		content: { html },
	import Icon from '@iconify/svelte';

	const icons = {
		fire1: 'wi:fire',
		fire2: 'vaadin:fire',
		fire3: 'mdi:fire',
		fire4: 'fa:fire',
		fire5: 'fa5:fire',
		fire6: 'fa5:fire-alt',
		fire7: 'el:fire',
		fire8: 'eva:fire',
		arrowCircleDown1: 'bi:arrow-down-circle-fill',
		arrowCircleDown2: 'eva:arrow-circle-down-fill',
		arrowCircleLeft2: 'eva:arrow-circle-left-fill',
		home: 'bx:bxs-home'
	};
</script>

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

<div
	class="main center flex flex-col content-start items-center px-3 pb-3 md:px-10 md:pb-10 lg:px-20 lg:pb-20 xl:px-48 xlpb-48"
>
	<div class="icon-nav exception-2 w-screen border-b-[1px] border-amber-400/[0.5] mt-4 md:mt-8 pl-8 ">
		<!-- <div class="border-b-[1px] border-amber-400/[0.5] h-[1px] w-full p-1"> -->
		<a
			href="/blog"
			class="text-winterblues-700 rounded-xl self-start justify-self-start place-self-start"
		>
			<div
				class="group relative cursor-pointer transition-all duration-400 bg-gradient-to-r hover:bg-gradient-to-r from-winterblues-400/[0] via-amber-400/[0] to-fuchsia-600/[0] hover:from-winterblues-400/[0] hover:via-rose-400/[.25] hover:to-fuchsia-600/[0.5] lg:py-4 my-8 rounded-lg hover:transition-colors"
			>
				<Icon
					icon={icons.home}
					class="absolute top-0 lg:top-8 left-0 w-12 h-12 -ml-2 mb-2 transition:all duration-200 scale-0 group-hover:scale-0 group-hover:text-winterblues-300 group-hover:opacity-0"
				/>
				<Icon
					icon={icons.arrowCircleLeft2}
					class="absolute top-0 lg:top-4 xl:top-[22px] left-0 w-12 h-12 -ml-2 mb-2 transition:all duration-200 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 text-amber-500 group-hover:text-winterblues-300 translate-x-2 group-hover:translate-x-0"
				/>
				<h1
					class="font-display flex items-center justify-center pl-2 pt-2 w-full font-bold text-winterblues-300 z-10 text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-0 md:mb-1 lg:mb-2 xl:mb-3 -mt-1"
				>
					{title}
				</h1>
			</div>
		</a>
		{#if tags}
			<div class="my-4 space-x-2 flex items-center justify-center">
				{#each tags as tag}
					<span
						class="flex self-stretch rounded bg-winterblues-800/[0.5] text-winterblues-400/[0.75] text-xs px-1.5 py-0.5 md:text-sm md:px-2 md:py-1 xl:text-base xl:px-2.5 xl:py-1.5"
						>{tag}</span
					>
				{/each}
			</div>
		{/if}
	</div>
	<div class="post-title">
		<p class="text-gray-400 mb-2 font-mono text-base tracking-widest font-semibold">
			{new Date(date).toDateString()}
		</p>
	</div>
	<!-- <a href="/" class="flex items-center mt-10">
        <img
            src={picture.url}
            alt={name}
            class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span class="flex-grow flex flex-col pl-4">
            <span class="title-font font-medium">{name}</span>
            <span class="text-secondary text-xs tracking-widest mt-0 5">{authorTitle}</span>
        </span>
    </a> -->

	<article
		class="blog-post text-winterblues-100 font-montserrat leading-loose md:leading-loose lg:leading-loose xl:leading-loose text-md md:text-lg lg:text-xl pb-12 mt-5"
	>
		{@html html}
		<!-- {content}  -->
		<!-- <div class="text-8xl flex items-center justify-center w-full">
			<div class="text-winterblues-700">~</div>
		</div> -->
		<div
			class="text-8xl test pt-10 bg-gradient-to-br from-yellow-400 via-amber-700 to-rose-600 bg-clip-text  flex items-center justify-center w-full"
		>
			<!-- <p class="text-transparent">This is a test</p> -->
			<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
				<linearGradient id="my-cool-gradient" x2="1" y2="1">
					<stop offset="0%" stop-color="#447799" />
					<stop offset="50%" stop-color="#224488" />
					<stop offset="100%" stop-color="#112266" />
				</linearGradient>
			</svg>

			<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
				<linearGradient id="gradient-fire" x2="1" y2="1">
					<stop offset="0%" stop-color="var(--color-yellow-500)" />
					<stop offset="15%" stop-color="var(--color-warm2-700)" />
					<stop offset="50%" stop-color="var(--color-amber-400)" />
					<stop offset="35%" stop-color="var(--color-yellow-500)" />
					<stop offset="75%" stop-color="var(--color-rose-700)" />
					<stop offset="80%" stop-color="var(--color-yellow-500)" />
					<stop offset="100%" stop-color="var(--color-warm2-300)" />
					<!-- <stop offset="25%" stop-color="var(--color-fuchsia-200)" /> -->
				</linearGradient>
			</svg>
			<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				width="1em"
				height="1em"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 1200 1200"
				id="fire-1"
				><path
					d="M381.64 1200C135.779 1061.434 71.049 930.278 108.057 751.148c27.321-132.271 116.782-239.886 125.36-371.903c38.215 69.544 54.183 119.691 58.453 192.364C413.413 422.695 493.731 216.546 498.487 0c0 0 316.575 186.01 337.348 466.98c27.253-57.913 40.972-149.892 13.719-209.504c81.757 59.615 560.293 588.838-64.818 942.524c117.527-228.838 30.32-537.611-173.739-680.218c13.628 61.319-10.265 290.021-100.542 390.515c25.014-167.916-23.8-238.918-23.8-238.918s-16.754 94.054-81.758 189.065c-59.36 86.762-100.49 178.847-23.257 339.556z"
				/></svg
			> -->
			<!-- <Icon
				class="test"
				fill="#f00"
				color="fill: url(#my-cool-gradient) #333;"
				icon={icons.fire1}
			/> -->
		</div>
	</article>
</div>

<style lang="scss">
	@import '../../prose.scss';

	.center > * {
		--gap: 1rem;
		--mw: 50rem;

		width: 100%;
		max-width: var(--mw);
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--gap);
		padding-right: var(--gap);
	}
	.center > .exception-1 {
		max-width: none;
	}
	.center > .exception-2 {
		// max-width: minmax( 50rem, 100%);
		// min-width: max( 50rem, 100vw);
		max-width: min(100%, 50rem);
		padding-left: 0;
		padding-right: 0;
	}

	:global(#fire-gradient-1) {
		--fire-1-offset-1: 0%;
		--fire-1-stop-1: var(--color-yellow-300);
		--fire-1-offset-2: 25%;
		--fire-1-stop-2: var(--color-amber-300);
		--fire-1-offset-3: 60%;
		--fire-1-stop-3: var(--color-rose-300);
		--fire-1-offset-4: 100%;
		--fire-1-stop-4: var(--color-yellow-100);
	}

	:global(#fire-1) {
		fill: url(#gradient-fire) #333;
	}
</style>
