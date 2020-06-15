module.exports = async (client, channel) => {
	let gu = require('../../models/Guild');
	let guild = await gu.findOne({ id: channel.guild.id });
	let c = guild.logs.action.channel;
	let o = channel.type;
	if (o === 0) o = 'Text';
	if (o === 2) o = 'Voice';
	if (o === 4) o = 'Category';
	if (!c || !guild.logs.action.enabled) return;
	if (guild === null) return;
	let oof = await channel.guild.getAuditLogs(1, null, 12).then((e) => e.entries[0]);
	let user = oof.user.id;
	client.createMessage(c, {
		embed: {
			title: 'Channel Deleted',
			description: `A channel has been deleted by <@!${user}>`,
			footer: { text: `ID: ${channel.id}` },
			color: 0xdb1a1a,
			timestamp: new Date(),
			author: { name: ` |  ${channel.guild.name}`, icon_url: channel.guild.iconURL },
			fields: [
				{
					name: 'Name',
					value: channel.name,
					inline: true
				},
				{
					name: 'Type',
					value: o,
					inline: true
				}
			]
		}
	});
};
