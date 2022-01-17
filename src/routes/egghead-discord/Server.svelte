

<script>
	export let serverId, serverName;
	import { page } from '$app/stores';
	import Discord from '~icons/my-icons/discord';
	$: path = $page.path

</script>

{#if serverId === "home"}
<a href="/egghead-discord/" class="relative  block group">
	<div class="absolute -left-3 h-full flex items-center">
		<div class="
		{path === `/egghead-discord` 
		? 'h-10' 
		: 'h-5 opacity-0 scale-0 origin-left group-hover:scale-100 group-hover:opacity-100'} 
		 transition-all duration-200 bg-white w-1  rounded-r" ></div>
	</div>
	<div class="group-active:translate-y-[1px]">
		<div
			class=" w-12 h-12 flex items-center justify-center
			{path === `/egghead-discord`
				? 'bg-sky-700 text-white rounded-2xl'
				: 'text-gray-100 rounded-3xl bg-gray-600 group-hover:bg-sky-700 group-hover:text-white transition-all duration-200 rounded-3xl group-hover:rounded-2xl'}
				">
				<Discord class="w-7 h-5 " />
		</div>
		
	</div>
</a>
<hr class="border-b-2 border-b-white opacity-[0.06] rounded mx-2">

{:else}
<a href="/egghead-discord/{serverId}" class="relative space-y-2 block group">
	<div class="absolute -left-3 h-full flex items-center">
		<div class="
		{path.includes(serverId)
		? 'h-10' 
		: 'h-5 opacity-0 scale-0 origin-left group-hover:scale-100 group-hover:opacity-100'} 
		 transition-all duration-200 bg-white w-1  rounded-r" ></div>
	</div>
	<div class="group-active:translate-y-[1px]">
		<div
			class=" w-12 h-12 flex items-center justify-center
			{path.includes(serverId)
				? 'bg-sky-700 text-white rounded-2xl'
				: 'text-gray-100 rounded-3xl bg-gray-600 group-hover:bg-sky-700 group-hover:text-white transition-all duration-200 rounded-3xl group-hover:rounded-2xl'}
				">
			{serverId}
		</div>
	</div>
</a>
{/if}