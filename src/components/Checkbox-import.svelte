<script>
	import Param from './Param.svelte';
	import Checkbox from 'svelte-checkbox'
    import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let label = '';
	export let duration = ''
	export let checked = false;

	function handleChange() {
		dispatch("change", checked);
	}
</script>

<Param {label}>
	<div class="py-2">
		<Checkbox bind:checked={checked} on:change={handleChange} duration="400" primaryColor="#11cc55" size="2rem"/>
	</div>
	<!-- <input type='checkbox' bind:checked={checked} /> -->
</Param>

<style>
input {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	width: 100%;
}
</style>