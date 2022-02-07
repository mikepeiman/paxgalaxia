
<script context="module">
	// export const load = async ({ fetch }) => {
	// 	const res = await fetch('/ioredis.client');
    //     console.log(`🚀 ~ file: posts index.svelte ~ line 4 ~ load ~ res`, res)
	// 	if (res.ok) {
    //         console.log(`🚀 ~ file: index.svelte ~ line 7 ~ load ~ res`, res)
	// 		const { posts } = await res
    //         // console.log(`🚀 ~ file: index.svelte ~ line 7 ~ load ~ posts`, posts)
	// 		return { props: { posts } };
	// 	}
	// };
        import redis from '$lib/redisInit.js'
    // import redisDemo from './client.js'
    // redisDemo()
</script>



<h1>IOREDIS</h1>