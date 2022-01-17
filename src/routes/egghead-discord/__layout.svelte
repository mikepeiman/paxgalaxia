<script>
    	import { pageTitleStore } from '$stores/discord.js';
</script>
    <slot />

    <svelte:head>
        <title>{$pageTitleStore}</title>
    </svelte:head>