<script>
	import { fly, scale } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let open;
	import { page } from '$app/stores';
	$: path = $page.url.pathname;

	let links = [
		{ title: 'Home', url: '/' },
		{ title: 'About', url: '/about' },
		{ title: 'Blog', url: '/posts' },
		{ title: 'Posts endpoint', url: '/posts.json' },
		{ title: 'Todos', url: '/todos' },
		{ title: 'Quotes', url: '/quotes' },
		{ title: 'Creative', url: '/creative' },
		{ title: 'Mike', url: '/mikepeiman' }
	];

	let delayFactor = 50
	let duration = links.length * delayFactor;
	function dispatchMessage(e) {
		open = false
		let target = e.target.href
        console.log(`🚀 ~ file: HamburgerMenu.svelte ~ line 26 ~ dispatchMessage ~ target `, target )
		dispatch('message', {
			open: false,
			duration: duration
		});
		// let OHH = document.getElementsByClassName('open-hamburger-header')[0];
		// console.log(`🚀 ~ file: HamburgerMenu.svelte ~ line 27 ~ dispatching ~ OHH`, OHH);
		console.log(`🚀 ~ file: HamburgerMenu.svelte ~ line 29 ~ dispatching ~ duration`, duration);

	}
</script>

{#if open}
	<div
		class="open-hamburger-header header absolute top-0 z-50 w-full h-full bg-gradient-to-b from-black via-black  border-b-2 border-sky-900 flex items-center transition"
	>
		<nav
			class="open-hamburger-nav absolute w-auto top-0 left-0 bg-black pb-6 flex flex-col justify-center items-center transition"
		>
			{#each links as link, i}
				<a
					transition:fly={{ y: -15, delay: delayFactor * i }}
					href={link.url}
					class="nav-link tracking-widest w-full px-6 py-4 hover:text-cyan-500 hover:bg-gray-900"
					class:active={link.url === path}
					on:click={(e) => dispatchMessage(e)}>{link.title}</a
				>
			{/each}
		</nav>
		<hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
	</div>
{/if}

<style lang="scss">
	// :global(.header) {
	// 	grid-area: header;
	// }
	.header {
		width: 100vw;
	}
	nav {
		text-align: center;
		width: inherit;
		// padding-left: 10rem;
		// font-family: 'Montserrat', sans-serif;
		a {
			@apply mx-6 text-xl transition-all duration-150;
			:hover {
				@apply text-sky-600 underline decoration-sky-100 underline-offset-2;
			}
			&:active {
				@apply text-fuchsia-400;
			}
			.active {
				@apply text-orange-400 decoration-current underline-offset-2 decoration-orange-600;
			}
		}
	}
	// :global(nav a.active) {
	// 	@apply text-cyan-500 decoration-current underline underline-offset-4 decoration-cyan-500 transition-all;
	// }
</style>
