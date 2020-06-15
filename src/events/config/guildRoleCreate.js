module.exports = async (client, guild, role) => {
	let oa = require('../../models/Guild');
	let Guild = await oa.findOne({ id: guild.id });
	let d = Guild.logs.action.channel;
	if (guild.id === d) return;
	if (!d || !Guild.logs.action.enabled) return;
	let ba = await guild.getAuditLogs(1, null, 30).then((e) => e.entries[0]);
	let by = ba.user.id;
	client.createMessage(`${d}`, {
		embed: {
			title: 'Role Created',
			description: `A role was created by <@!${by}>.`,
			author: { name: `|  ${guild.name}`, icon_url: guild.iconURL },
			color: 0x10eb23,
			fields: [
				{
					name: 'Name',
					value: role.name,
					inline: true
				},
				{
					name: 'Features',
					value: `**Mentionable:** ${role.mentionable
						? 'True'
						: 'False'}\n**Position:** ${role.position}\n**Managed:** ${role.managed
						? 'True'
						: 'False'}\n**Colour:** ${role.color}`,
					inline: true
				}
			],
			footer: { text: `ID ${role.id}` },
			timestamp: new Date()
		}
	});
};
