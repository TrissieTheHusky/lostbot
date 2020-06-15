module.exports = async (client, member, newChannel) => {
	let oa = require('../../models/Guild');
	let guild = await oa.findOne({ id: member.guild.id });
	let a = guild.logs.action.channel;
	if (!a || !guild.logs.action.enabled) return;

	client.createMessage(a, {
		embed: {
			title: 'Joined Voice Channel',
			description: 'A member joined a voice channel',
			timestamp: new Date(),
			fields: [
				{
					name: 'Name',
					value: newChannel.name,
					inline: true
				},
				{
					name: 'Member',
					value: member.mention,
					inline: true
				}
			],
			color: 0x10eb23,
			footer: { text: `ID: ${newChannel.id}` },
			author: { name: ` |  ${member.guild.name}`, icon_url: member.avatarURL }
		}
	});
};
