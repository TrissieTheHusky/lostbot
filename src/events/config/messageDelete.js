module.exports = async (client, message) => {
	const sa = require('../../models/Guild');
	const guild = await sa.findOne({ id: message.channel.guild.id });

	const d = guild.logs.action.channel;
	if (message.author.bot !== false) return;
	if (!d || !guild.logs.action.enabled) return;
	let o = await message.channel.guild.getAuditLogs(1, null, 72).then((e) => e.entries[0]);
	let us = o.user.id;
	let embed = {
		title: 'Message Deleted',
		color: Number(require('../../config').colours.red),
		author: { name: ` |  ${message.channel.guild.name}`, icon_url: message.author.avatarURL },
		description: `A message sent in ${message.channel.mention} which was sent by ${message.author
			.mention} was deleted.`,
		fields: [],
		timestamp: new Date()
	};
	if (message.content && !message.attachments.length) {
		embed.fields.push({ name: 'Content', value: message.content.slice(0, 350), inline: true });
		embed.fields.push({ name: 'Deleted By', value: `<@!${us}>`, inline: true });
	} else if (message.attachments.length && message.content) {
		embed.image = { url: message.attachments[0].proxy_url };
		embed.fields.push({ name: 'Content', value: message.content.slice(0, 350), inline: true });
		embed.fields.push({ name: 'Deleted By', value: `<@!${us}>`, inline: true });
	} else if (message.attachments.length && !message.content) {
		embed.image = { url: message.attachments[0].proxy_url };
	}
	client.createMessage(d, {
		embed
	});
};
