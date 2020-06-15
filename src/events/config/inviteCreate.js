module.exports = async (client, guild, invite) => {
	let a = require('../../models/Guild');
	let Guild = await a.findOne({ id: guild.id });
	let channel = Guild.logs.action.channel;
	if (!channel || !Guild.logs.action.enabled) return;
	let temp = invite.temporary;
	let col = Number(require('../../config').colours.yellow);

	client.createMessage(channel, {
		embed: {
			title: 'Invite Created',
			description: `An invite was created by <@!${invite.inviter.id}>.`,
			fields: [
				{
					name: 'Code',
					value: invite.code,
					inline: true
				},
				{
					name: 'Features',
					value: `**Channel:** ${invite.channel
						.mention}\n**Max Uses:** ${invite.maxUses}\n**Temporary:** ${temp}`,
					inline: true
				}
			],
			footer: { text: `ID: ${invite.inviter.id}` },
			author: { name: ` |  ${guild.name}`, icon_url: invite.inviter.avatarURL },
			color: col,
			timestamp: new Date()
		}
	});
};
