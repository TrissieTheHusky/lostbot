module.exports = async (client, channel, oldChannel) => {
	let uild = require('../../models/Guild');
	let guild = await uild.findOne({ id: channel.guild.id });
	let alchan = guild.logs.action.channel;
	if (!alchan || !guild.logs.action.enabled) return;
	if (channel.name !== oldChannel.name) {
		let oo = await channel.guild.getAuditLogs(1, null, 10).then((e) => e.entries[0]);
		let by = oo.user.id;
		client.createMessage(alchan, {
			embed: {
				title: 'Channel Renamed',
				description: `A channel has been renamed by <@!${by}>`,
				fields: [
					{
						name: 'Old Name',
						value: '#' + oldChannel.name,
						inline: true
					},
					{
						name: 'New Name',
						value: '#' + channel.name,
						inline: true
					}
				],
				author: { name: `|  ${channel.guild.name}`, icon_url: channel.guild.iconURL },
				footer: { text: `ID: ${channel.id}` },
				color: 0xebd910,
				timestamp: new Date()
			}
		});
	} else if (oldChannel.topic !== channel.topic) {
		let oo = await channel.guild.getAuditLogs(1, null, 10).then((e) => e.entries[0]);
		let by = oo.user.id;
		let embed = {
			title: 'Channel Topic Updated',
			description: `A channels topic, ${channel.mention}, has been updated by <@!${by}>`,
			fields: [
				{
					name: 'Old Topic',
					value: oldChannel.topic,
					inline: true
				}
			],
			color: Number(require('../../config.json').colours.yellow),
			timestamp: new Date(),
			footer: { text: `ID: ${channel.id}` },
			author: { name: ` |  ${channel.guild.name}`, icon_url: channel.guild.iconURL }
		};
		if (channel.topic.length > 0) {
			embed.fields[1] = { name: 'New Topic', value: channel.topic, inline: true };
		} else {
			embed.fields[1] = { name: 'New Topic', value: 'None', inline: true };
		}

		if (oldChannel.topic.length > 0) {
			embed.fields[1] = { name: 'Old Topic', value: channel.topic, inline: true };
		} else {
			embed.fields[1] = { name: 'Old Topic', value: 'None', inline: true };
		}

		client.createMessage(alchan, { embed });
	} else if (oldChannel.position !== channel.position) {
		let oo = await channel.guild.getAuditLogs(1, null, 10).then((e) => e.entries[0]);
		let by = oo.user.id;
		client.createMessage(alchan, {
			embed: {
				title: 'Channel Position Updated',
				description: `A channels position, ${channel.mention}, has been updated by <@!${by}>`,
				fields: [
					{
						name: 'Old Position',
						value: `${oldChannel.position} Out of ${channel.guild.channels.size}`,
						inline: true
					},
					{
						name: 'New Position',
						value: `${channel.position} Out of ${channel.guild.channels.size}`,
						inline: true
					}
				],
				timestamp: new Date(),
				color: Number(require('../../config').colours.yellow),
				footer: { text: `ID: ${channel.id}` },
				author: { name: ` |  ${channel.guild.name}`, icon_url: channel.guild.iconURL }
			}
		});
	} else if (oldChannel.type !== channel.type) {
		let newty = channel.type;
		let olty = oldChannel.type;

		if (olty === 0) olty = 'Text';
		if (olty === 2) olty = 'Voice';
		if (olty === 4) olty = 'Category';

		if (newty === 0) newty = 'Text';
		if (newty === 2) newty = 'Voice';
		if (newty === 4) newty = 'Category';
		let oo = await channel.guild.getAuditLogs(1, null, 10).then((e) => e.entries[0]);
		let by = oo.user.id;
		client.createMessage(alchan, {
			embed: {
				title: 'Channel Type Changed',
				description: `A channels type, ${channel.mention}, has been updated by <@!${by}>`,
				fields: [
					{
						name: 'Old Type',
						value: olty,
						inline: true
					},
					{
						name: 'New Type',
						value: newty,
						inline: true
					}
				],
				timestamp: new Date(),
				color: Number(require('../../config').colours.yellow),
				footer: { text: `ID: ${channel.id}` },
				author: { name: ` |  ${channel.guild.name}`, icon_url: channel.guild.iconURL }
			}
		});
	} else if (oldChannel.nfsw !== channel.nfsw) {
		const oo = await channel.guild.getAuditLogs(1, null, 10).then((e) => e.entries[0]);
		const by = oo.user.id;
		client.createMessage(alchan, {
			embed: {
				title: 'Channel Type Change',
				description: `A channels type, ${channel.mention} has been updated by <@!${by}>`,
				fields: [
					{
						name: 'Was NFSW',
						value: oldChannel.nfsw ? 'True' : 'False',
						inline: true
					},
					{
						name: 'Now NFSW',
						value: channel.nfsw ? 'True' : 'False',
						inline: true
					}
				],
				timestamp: new Date(),
				color: Number(require('../../config').colours.yellow),
				footer: { text: `ID: ${channel.id}` },
				author: { name: ` :warning: | ${channel.guild.name}`, icon_url: channel.guild.iconURL }
			}
		});
	}
};
