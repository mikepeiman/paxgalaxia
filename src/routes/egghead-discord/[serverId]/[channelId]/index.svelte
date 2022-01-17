<script context="module">
	export const load = async ({ page: { params } }) => {
		const { serverId, channelId } = params;

		return { props: { serverId, channelId } };
	};
</script>

<script>
	export let serverId, channelId;
	import { D } from '$stores/discord.js';
	import MainUi from '../../MainUI.svelte';
	import {  afterUpdate } from 'svelte';

	let discordData

	afterUpdate(() => {
		discordData = D.load();
		getThisChannelFromId();
	});

	async function getThisChannelFromId() {
		let serverIndex = discordData.findIndex((s) => s.id === serverId);
		let server = discordData[serverIndex];
		if(server) {

			server.channels.forEach(async (channelGroup) => {
				channelGroup.channels.forEach(async (channel) => {
					if (channel.id === channelId) {
						if (channel.messages.length < 1) {
							D.generateMessages(serverId, channelId);
						}
					}
				});
			});
		}
	}
</script>

<MainUi {serverId} {channelId} />