<script>
import MetabrainCanvas from '$components/MetabrainCanvas.svelte';
	import { onMount } from 'svelte';
	let mounted = false
	onMount(() => {
		mounted= true
	});
	import { page } from '$app/stores';
	$: path = $page.url.pathname;
	import Icon from '@iconify/svelte';
	let email = ""
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
	$: email.length > 3 ? fadeMceError() : ""
    $: console.log(`🚀 ~ file: index.svelte ~ line 28 ~ email`, email)

	function fadeMceError() {
		// let mceError = document.getElementById('mce-error-response')
		let mceError = document.querySelectorAll('.mce_inline_error')
        console.log(`🚀 ~ file: index.svelte ~ line 30 ~ fadeMceError ~ mceError`, mceError[1])

        console.log(`🚀 ~ file: index.svelte ~ line 33 ~ fadeMceError ~ email`, email)
		if(email.length > 3){}
		mceError[1].classList.add('fadeOut')
	}
	function checkMCEError() {
		// let mceError = document.getElementById('mce-error-response')
		let mceError = document.querySelectorAll('.mce_inline_error')
        console.log(`🚀 ~ file: index.svelte ~ line 30 ~ fadeMceError ~ mceError`, mceError[1])

        console.log(`🚀 ~ file: index.svelte ~ line 33 ~ fadeMceError ~ email`, email)
		if(email.length < 4){
			mceError[1].classList.remove('fadeOut')
		}
	}
</script>
{#if mounted}
<!-- <svelte:window bind:innerWidth={windowInnerWidth} /> -->

<!-- <main
	class="homepage bg-black mt-20 flex flex-col self-center justify-items-center items-center w-full lg:text-sm lg:px-12 xl:px-24 2xl:w-4/5 2xl:px-12 3xl:w-3/4 3xl:px-36 mt-4 md:mt-20"
> -->
	<div class="flex flex-col w-full h-full align-center justify-start text-center bg-black/40">
		<h1 class="relative z-10 text-5xl mt-[12rem] md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-display">MetaBrain</h1>
		<div
			class="flex relative z-10 flex-col relative py-8 my-4 w-auto mx-8 rounded-xl p-0 mx-6 md:p-8 md:mx-12  text-lg md:text-2xl lg:text-3xl xl:text-4xl font-montserrat"
		>
			<h2 class="p-2 relative z-10">One app to rule them all, one platform to unite them;</h2>
			<h2 class="p-2 relative z-10">One knowledge graph to learn and plan and prosper for a lifetime.</h2>
			<!-- Begin Mailchimp Signup Form -->
			<div class="w-full flex align-center justify-center">
				<!-- <div id="mc_embed_signup" class="w-1/2 py-6 border-t-2 border-b-2 border-sky-50"> -->
				<div id="mc_embed_signup" class="">
					<form
						action="https://mikepeiman.us7.list-manage.com/subscribe/post?u=2e0789618f3335c1fdeae5f80&amp;id=4f26dc006f"
						method="post"
						id="mc-embedded-subscribe-form"
						name="mc-embedded-subscribe-form"
						class="validate bg-none bg-transparent flex items-center justify-center w-auto"
						target="_blank"
						novalidate
					>
						<div class="flex items-center m-0 flex-col absolute top-[12rem] w-auto md:w-auto mt-12">
							<h2 class="font-display text-base mb-1 text-winterblues-200 mx-0">
								Get on the list for updates and early access.
							</h2>
							<div
								id="mc_embed_signup_scroll"
								class="statement px-4 flex items-center justify-center relative z-10"
							>
								<div class="mc-field-group flex items-center justify-center relative w-auto">
									<input
										type="email"
										bind:value={email}
										name="EMAIL"
										class="z-10 text-sm md:text-base xl:text-lg required email rounded bg-transparent focus:shadow-none focus:ring-0 outline-none border-none w-[26ch] -ml-4 text-gray-100 w-auto"
										id="mce-EMAIL"
										placeholder="email address"
										on:blur={checkMCEError}
									/>
									<button
										type="submit"
										name="subscribe"
										value="Subscribe"
										id="mc-embedded-subscribe"
										class="button text-sm w-[9ch] md:text-base xl:text-lg h-6 w-auto ml-4 -mr-4 p-5 rounded-r-2xl flex items-center justify-center text-center bg-gray-900 hover:bg-gray-800 text-winterblues-400"
										>Subscribe</button
									>
								</div>
								<div id="mce-responses" class="clear foot transition absolute left-0 top-0 text-lg ">
									<div
										class="response h-8 block absolute -top-6 translate-y-8 w-60 text-lg flex items-center"
										id="mce-error-response"
									/>
									<div class="response h-8 relative" id="mce-success-response" style="opacity:0;">
										<Icon icon={icons.x} class="h-8 w-8 p-0 absolute text-white" />
									</div>
								</div>
								<div style="position: absolute; left: -5000px;" aria-hidden="true">
									<input
										type="text"
										name="b_2e0789618f3335c1fdeae5f80_4f26dc006f"
										tabindex="-1"
										value=""
									/>
								</div>
								<div class="optionalParent">
									<div class="clear foot">
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="absolute w-screen h-screen top-0 left-0 ">
			<MetabrainCanvas />
		</div>
	</div>
<!-- </main> -->
{/if}
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
