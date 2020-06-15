module.exports = async (client, guild, member, oldMember) => {
	let oa = require('../../models/Guild');
	let Guild = await oa.findOne({ id: guild.id });
	if (Guild === null) return;
	let alchn = Guild.logs.action.channel;
	let oof = member.nick;
	if (oof === null) oof = member.username;
	let old = oldMember.nick;
	if (old === null) old = 'None';
	if (oof === old) return;
	if (!alchn) return;
	if (!member || !Guild.logs.action.enabled) return;
	let oo = await guild.getAuditLogs(1, null, 24).then((e) => e.entries[0]);
	let by = oo.user.id;
	if (oldMember.nick !== member.nick) {
		let embed = {
			title: 'Nickname Changed',
			description: `A member, ${member.mention}, nickname has changed by <@!${by}>`,
			fields: [
				{
					name: 'Old Nickname',
					value: `${old}`,
					inline: true
				},
				{
					name: 'New Nickname',
					value: `${oof}`,
					inline: true
				}
			],
			author: { name: `|  ${guild.name}`, icon_url: member.avatarURL },
			footer: { text: 'ID: ' + member.id },
			color: 0xebd910
		};
		if (oof === null) oof = member.username;
		client.createMessage(alchn, { embed });
	}
};
