module.exports = async (client, member, oldChannel) => {
	let p = require('../../models/Guild');
	let guild = await p.findOne({ id: member.guild.id });
	let aa = guild.logs.action.channel;
	if (!aa || !guild.logs.action.enabled) return;
	client.createMessage(aa, {
		embed: {
			title: 'Voice Channel Left',
			description: 'A member has left a voice channel.',
			fields: [
				{
					name: 'Name',
					value: oldChannel.name,
					inline: true
				},
				{
					name: 'Member',
					value: member.mention,
					inline: true
				}
			],
			timestamp: new Date(),
			color: Number(require('../../config').colours.red),
			footer: { text: `ID: ${oldChannel.id}` },
			author: { name: ` |  ${member.guild.name}`, icon_url: member.avatarURL }
		}
	});
};
