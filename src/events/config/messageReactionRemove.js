module.exports = async (client, message, emoji, userID) => {
	let oaof = require('../../models/Guild');
	let guild = await oaof.findOne({ id: message.channel.guild.id });
	let url = `https://discordapp.com/channels/${message.channel.guild.id}/${message.channel.id}/${message.id}`;
	let channel = guild.logs.action.channel;
	if (!channel || !guild.logs.action.enabled) return;
	let oof = `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
	if (emoji.id === null) oof = `${emoji.name}`;
	const aV = await client.getRESTUser(userID);
	const av = `https://cdn.discordapp.com/avatars/${userID}/${aV.avatar}.jpg?size=128`;
	let Av = String(av);

	client.createMessage(channel, {
		embed: {
			title: 'Reaction Removed',
			description: `[View Message](${url})\nA reaction was removed in ${message.channel.mention}.`,
			fields: [
				{
					name: 'Reaction',
					value: `${oof}`,
					inline: true
				},
				{
					name: 'Removed By',
					value: `<@!${userID}>`,
					inline: true
				}
			],
			color: Number(require('../../config').colours.red),
			timestamp: new Date(),
			author: {
				name: ` |  ${message.channel.guild.name}`,
				icon_url: Av
			},
			footer: { text: `ID: ${userID}` }
		}
	});
};
