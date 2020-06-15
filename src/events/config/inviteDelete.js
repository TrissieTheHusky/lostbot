module.exports = async (client, guild, invite) => {
	let oof = require('../../models/Guild');
	let Guild = await oof.findOne({ id: guild.id });

	let channel = Guild.logs.action.channel;
	if (!channel || !Guild.logs.action.enabled) return;
	let o = await guild.getAuditLogs(1, null, 42).then((e) => e.entries[0]);
	let by = o.user.id;
	let re = invite.revoked;
	if (re === null) re = 'False';
	let temp = invite.temporary;
	if (temp === null) temp = 'False';
	let u = invite.uses;
	if (u === null) u = '0';
	client.createMessage(channel, {
		embed: {
			title: 'Invite Deleted',
			description: `An invite was deleted by <@!${by}>.`,
			fields: [
				{
					name: 'Code',
					value: invite.code,
					inline: true
				},
				{
					name: 'Features',
					value: `**Uses:** ${u}/${guild.memberCount}\n**Revoked:** ${re}\n**Temporary:** ${temp}`,
					inline: true
				}
			],
			author: { name: ` | ${guild.name}`, icon_url: guild.iconURL },
			footer: { text: 'Created At: ' },
			timestamp: new Date(invite.createdAt),
			color: Number(require('../../config').colours.red)
		}
	});
};
