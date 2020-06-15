module.exports = async (client, member, oldChannel, newChannel) => {
	let dd = require('../../models/Guild');
	let guild = await dd.findOne({ id: member.guild.id });
	let o = guild.logs.action.channel;
	if (!o || !guild.logs.action.enabled) return;

	client.createMessage(o, {
		embed: {
			title: 'Voice Channel Switch',
			description: `${member.mention} has switched a voice channel.`,
			timestamp: new Date(),
			footer: { text: `Old ID: ${oldChannel.id} | New ID: ${newChannel.id}` },
			color: 0xebd910,
			fields: [
				{
					name: 'Old Channel',
					value: oldChannel.name,
					inline: true
				},
				{
					name: 'New Channel',
					value: newChannel.name,
					inline: true
				}
			],
			author: { name: ` |  ${member.guild.name}`, icon_url: member.avatarURL }
		}
	});
};
