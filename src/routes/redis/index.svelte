<script context="module">

	import HeroForm from '$components/HeroForm.svelte';
	// import nodeRedisDemo from './client.js';
	// import { browser } from '$app/env';
	// if (!browser) {
	// 	nodeRedisDemo();
	// 	console.log(`process: !!!!!! `, process);
	// }
	// console.log(`process: !!!!!! `, process);
	let inputItem
	$: console.log(`input item: `, inputItem)
</script>

<h1>REDIS</h1>

<HeroForm />