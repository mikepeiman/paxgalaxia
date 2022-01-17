<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/blog.json');
        // console.log(`🚀 ~ file: posts index.svelte ~ line 4 ~ load ~ res`, res)
		if (res.ok) {
			const { posts } = await res.json();
            console.log(`🚀 ~ file: index.svelte ~ line 7 ~ load ~ posts`, posts)
			return { props: { posts } };
		}
	};
</script>

<script>
	import Posts from "$components/Posts.svelte";
	export let posts
    console.log(`🚀 ~ file: POSTS index.svelte ~ line 15 ~ posts`, posts)
	posts.forEach(post => {
		
		console.log(`🚀 ~ file: index.svelte ~ line 20 ~ post`, post)
	});
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
	arrowCircle1: 'bi:arrow-down-circle-fill',
	arrowCircle2: 'eva:arrow-circle-down-fill',
	arrowCircleLeft2: 'eva:arrow-circle-left-fill',
	home: 'bx:bxs-home-heart',
};
</script>

<!-- <a href="/blog" class="text-sky-500/[0.5] transition-all rounded-xl w-0">
	<Icon icon={icons.arrowCircle2}  class="w-12 h-12 -ml-2 mb-2 transition:all duration-200 hover:rotate-90 hover:text-sky-500" />
</a> -->
<div class="center">
	<div class="icon-nav w-full border-b-[1px] border-amber-400/[0.5] ">
		<!-- <div class="border-b-[1px] border-amber-400/[0.5] h-[1px] w-full p-1"> -->
		<a href="/" class="text-winterblues-700 rounded-xl self-start justify-self-start place-self-start">
			<div class="group relative cursor-pointer transition-all duration-400 bg-gradient-to-r hover:bg-gradient-to-r from-winterblues-400/[0] via-amber-400/[0] to-fuchsia-600/[0] hover:from-winterblues-400/[0] hover:via-rose-400/[.25] hover:to-fuchsia-600/[0.5] h-12 px-8 my-8 rounded-lg hover:transition-colors">
				<Icon
					icon={icons.home}
					class="absolute top-0 left-0 w-12 h-12 -ml-2 mb-2 transition:all duration-200 group-hover:scale-0 group-hover:text-winterblues-300 group-hover:opacity-0"
				/>
				<Icon
					icon={icons.arrowCircleLeft2}
					class="absolute top-0 left-0 w-12 h-12 -ml-2 mb-2 transition:all duration-200 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 text-amber-500 group-hover:text-winterblues-300 translate-x-8 group-hover:translate-x-0"
				/>
				<h1 class="w-full flex items-center justify-center h-12 text-3xl font-newsreader font-bold text-winterblues-700 group-hover:opacity-0 group-hover:h-0">Articles</h1>
				<h1 class="w-full flex items-center justify-center h-12 text-3xl font-newsreader font-bold text-winterblues-400 opacity-0 h-0 group-hover:opacity-100 group-hover:h-12 ">Home</h1>
			</div>
		</a>
    </div>
	
	<div class="posts flex items-center w-full justify-center">
		<Posts {posts}/>
	</div>
</div>