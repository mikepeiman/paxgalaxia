<script context="module">
	export const load = async ({ fetch, page: { params } }) => {
		const { serverId } = params;
		return { props: { serverId } };
	};
</script>

<script>
	export let serverId;
	import MainUi from '../MainUI.svelte';
</script>

<MainUi {serverId} />
