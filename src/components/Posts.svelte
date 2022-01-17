<script>
	export let posts;
</script>

<!-- <script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/posts.json');
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};
</script> -->

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

<div class="flex flex-col items-center">
	{#each posts as { title, slug, excerpt, coverImage, date, tags }}
		<a href={`/blog/${slug}`} class="p-1 m-6 w-full bg-gray-900 my-6 hover:bg-sky-800/[0.25] hover:scale-[1.025] transition rounded">
			<div class="p-1 shadow-2xl">
				<!-- <figure class="px-10 pt-10 ">
					<img class="rounded-xl " src={coverImage.url} alt={`Cover image for ${title}`} />
				</figure> -->
				<div class="post-card p-6 shadow-xl">
					<div class="font-mono">{date}</div>
					<h1 class="title text-winterblues-300">{title}</h1>
					<p>{excerpt}</p>
					<div class="flex justify-start mt-5 space-x-2">
						{#if tags}
						<div class="post-tags mt-5 space-x-2 flex flex-wrap">
							{#each tags as tag}
								<div class="px-2 py-1 m-0 my-1 rounded bg-sky-900/[0.5] text-sky-400/[0.5]">{tag}</div>
							{/each}
						</div>
					{/if}
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style lang="scss">
	@import '../prose.scss';
	:global(.center > *) {
		--gap: 1rem;
		--mw: 50rem;

		width: 100%;
		max-width: var(--mw);
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--gap);
		padding-right: var(--gap);
	}
	:global(.center > .exception-1) {
		max-width: none;
	}
	:global(.center > .exception-2) {
		// max-width: minmax( 50rem, 100%);
		// min-width: max( 50rem, 100vw);
		max-width: min(100%, 50rem);
		padding-left: 0;
		padding-right: 0;
	}
	.post-tags {
		grid-area: tags;
		div {
			margin-left: 0px;
			margin-right: 4px;
		}
	}
</style>
