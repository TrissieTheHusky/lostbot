const { online, dnd, offline, idle, boost, streaming } = require('..//..//emotes.json');

module.exports = {
	name: 'membercount',
	aliases: [ 'mc' ],
	category: 'Information',
	description: 'A server breakdown of the size of statuses and more',

	execute: (message, client) => {
		let totalMembers = message.channel.guild.members.size;
		let onlineMembers = message.channel.guild.members.filter((u) => u.status === 'online').length;
		let idleMembers = message.channel.guild.members.filter((u) => u.status === 'idle').length;
		let offlineMembers = message.channel.guild.members.filter((u) => u.status === 'offline').length;
		let dndMembers = message.channel.guild.members.filter((u) => u.status === 'dnd').length;
		let streamingMembers = message.channel.guild.members.filter((u) => u.status === 'streaming').length;
		let boosts = message.channel.guild.premiumSubscriptionCount + ' (' + message.channel.guild.premiumTier + ')';
		let bots = message.channel.guild.members.filter((u) => u.bot).length;
		let humans = message.channel.guild.members.filter((u) => !u.bot).length;
		let bP = (bots / message.channel.guild.memberCount * 100).toFixed(2) + '%';
		let uP =
			((message.channel.guild.memberCount - bots) / message.channel.guild.memberCount * 100).toFixed(2) + '%';

		client.createMessage(message.channel.id, {
			embed: {
				title: `${message.channel.guild.name}'s membercount`,
				color: 0xfffffa,
				fields: [
					{
						name: 'Online',
						value: `${online} ${onlineMembers}`,
						inline: true
					},
					{
						name: 'Bots',
						value: `:robot: ${bots}`,
						inline: true
					},
					{
						name: 'Humans',
						value: `:bust_in_silhouette: ${humans}`,
						inline: true
					},
					{
						name: 'Idle',
						value: `${idle} ${idleMembers}`,
						inline: true
					},
					{
						name: 'Do not Disturb',
						value: `${dnd} ${dndMembers}`,
						inline: true
					},
					{
						name: 'Offline',
						value: `${offline} ${offlineMembers}`,
						inline: true
					},
					{
						name: 'Boosts',
						value: `${boost} ${boosts}`,
						inline: true
					},
					{
						name: 'Member Percentage',
						value: `:grey_question: ${uP}`,
						inline: true
					},
					{
						name: 'Bot Percentage',
						value: `:grey_question: ${bP}`,
						inline: true
					}
				],
				description: `An advanced breakdown, showing boosts, the size of online, offline, idle, and do not disturb members, more information too.\n**There are ${totalMembers} members in ${message
					.channel.guild.name}**`
			}
		});
	}
};
