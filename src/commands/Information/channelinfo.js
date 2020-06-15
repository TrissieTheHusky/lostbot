module.exports = {
	name: 'channelinfo',
	description: 'View information about a certain channel',
	usage: 'channelinfo [channel]',
	cooldown: 3,

	execute: async (message, client, args) => {
		let channel =
			message.channel.guild.channels.find((e) => e.id === args[0]) ||
			message.channel.guild.channels.find((e) => e.mention === args[0]) ||
			message.channel.guild.channels.find((e) => e.name.toLowerCase().includes(args.join(' ').toLowerCase())) ||
			message.channel;
		if (!channel) {
			return message.channel.createMessage('cant find channel');
		} else if (!args.length) {
			channel = message.channel.id;
		} else {
			let type = channel.type;
			let embed = {
				author: { name: channel.name, icon_url: message.channel.guild.iconURL },
				fields: [
					{
						name: 'Channel',
						value: channel.mention,
						inline: true
					},
					{
						name: 'ID',
						value: channel.id
					},
					{
						name: 'Type',
						value: type,
						inline: true
					},
					{
						name: 'Position',
						value: `#${channel.position} Out of #${message.channel.guild.channels.size}`,
						inline: true
					}
				],
				footer: { text: `Created At` },
				timestamp: new Date(channel.createdAt)
			};
			if (channel.permissionOverwrites.size > 1) {
				let perms = `<@&${channel.permissionOverwrites
					.filter((e) => e.type === 'role')
					.map((e) => e.id)
					.join(' ')}>`;
				let e = channel.permissionOverwrites.filter((e) => e.type === 'member').map((e) => e.mention);

				embed.fields.push({ name: 'Permission Overwrites - Role', value: perms });
				embed.fields.push({ name: 'Permission Overwrites - Member', value: mperms });
			}
			message.channel.createMessage({ embed });
		}
	}
};
