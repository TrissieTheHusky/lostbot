module.exports = async (client, message) => {
	let sa = require('../../models/Guild');
	let guild = await sa.findOne({ id: message.channel.guild.id });

	let d = guild.logs.action.channel;
	if (message.author.bot !== false) return;
	if (!d || !guild.logs.action.enabled) return;
	let o = await message.channel.guild.getAuditLogs(1, null, 72).then((e) => e.entries[0]);
	let us = o.user.id;
	let yeet = message.content;
	if (yeet.length > 360) yeet = `${yeet.slice(0, 360)}\n.....`;

	client.createMessage(d, {
		embed: {
			title: 'Message Deleted',
			color: 0xdb1a1a,
			author: { name: ` |  ${message.channel.guild.name}`, icon_url: message.author.avatarURL },
			description: `A message sent in ${message.channel.mention} which was sent by ${message.author
				.mention} was deleted.`,
			fields: [
				{
					name: 'Message Content',
					value: yeet,
					inline: true
				},
				{
					name: 'Deleted By',
					value: `<@!${us}>`,
					inline: true
				}
			],
			timestamp: new Date()
		}
	});
};
