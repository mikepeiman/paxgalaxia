<script>
	export let serverId, channelId, channel, channelName;
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { pageTitleStore } from '$stores/discord.js';
	import Icon from '@iconify/svelte';
	$: path = $page.path;
	import IconHashSmall from '~icons/line-md/hash-small';
	import IconPersonPlus from '~icons/bi/person-plus-fill';

	function channelUpdate() {
		channel.read = true;
		dispatch('dispatch', { channelRead: true });
		pageTitleStore.set(channelName);
	}
	$: active = path === `/egghead-discord/${serverId}/${channelId}`;
</script>

<div class="relative bg-gray-800 group" data-dnd-name="svelte-kit">
	<div class="relative" role="listitem">
		<div
			class="
        {active && channel.read ? 'bg-sky-600/[0.32]' : 'group-hover:bg-sky-800/[0.16]'} 
          bg-gray-800 bg-opacity-0 text-white rounded-r relative px-2 ml-2 rounded-sm flex align-center group-active:bg-sky-800/[0.32]"
		>
			<a
				href="/egghead-discord/{serverId}/{channelId}"
				role="link"
				on:click={() => channelUpdate()}
				class="flex-1 py-[6px] cursor-pointer relative"
				data-list-item-id="channels___819723698415599626"
				tabindex="-1"
				aria-label="unread, svelte-kit (text channel)"
			>
				{#if !channel.read}
					<div class="absolute top-3.5 -left-4 -ml-1">
						<div class="bg-white w-2 h-2 rounded" />
					</div>
				{/if}
				<div class="flex align-center text-gray-500" aria-hidden="true">
					<div class="relative w-6 h-6 -mt-[2px]">
						{#if channel.icon === 'heroicons-solid:chat-alt'}
							<IconHashSmall
								class="
							{active ? 'text-sky-400' : ''}
							absolute mt-1 w-6 h-6 font-thin "
							/>
							<Icon
								class="
								{active ? 'text-sky-200' : ''}
								absolute mt-0.5 font-thin h-3 w-3  z-10 left-3 -bottom-[3px] bg-gray-800 rounded-sm"
								icon={channel.icon}
							/>
						{:else}
							<Icon
								class="
							{active ? 'text-sky-400' : ''}
							mt-0.5 font-thin  w-6 h-6 "
								icon={channel.icon}
							/>
						{/if}
					</div>
					<div
						class="{active && channel.read ? 'text-sky-200' : 'active:text-gray-400 '}
						{active && !channel.read ? 'text-sky-200 active:text-white' : ' '}
						{!active && !channel.read ? 'text-white active:text-sky-200' : ' '}
						 pl-2"
					>
						{channelName.toLowerCase()}
					</div>
					<div
						class="
                    {active ? 'opacity-1' : 'opacity-0 group-hover:opacity-50'} 
                    flex align-center  absolute top-0 right-0 mt-[10px] mr-2"
					>
						<IconPersonPlus
							class="text-sky-300  hover:text-sky-400 opacity-1 w-4 h-4 group-hover:opacity-1 transition-all"
						/>
					</div>
				</div></a
			>
		</div>
	</div>
</div>
