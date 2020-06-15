module.exports = async (client, guild, role) => {
	const gu = require('../../models/Guild');
	const Guild = await gu.findOne({ id: guild.id });
	let alchan = Guild.logs.action.channel;
	if (guild.id === alchan) return;
	if (!alchan || !Guild.logs.action.enabled) return;
	let oof = await guild.getAuditLogs(1, null, 32).then((e) => e.entries[0]);
	let by = oof.user.id;
	client.createMessage(`${alchan}`, {
		embed: {
			title: 'Role Deleted',
			color: 0xdb1a1a,
			description: `A role has been deleted by <@!${by}>`,
			fields: [
				{
					name: 'Role',
					value: role.name,
					inline: true
				},
				{
					name: 'Features',
					value: `**Mentionable:** ${role.mentionable ? 'True' : 'False'}\n**Managed:** ${role.managed
						? 'True'
						: 'False'}\n**Position:** ${role.position}\n**Colour:** ${role.color.toString(
						16
					)}\n**Created At:** ${new Date(role.createdAt).toDateString()}`,
					inline: true
				}
			],
			timestamp: new Date(),
			footer: { text: `ID: ${role.id}` },
			author: { name: '|  ' + guild.name, icon_url: guild.iconURL }
		}
	});
};
