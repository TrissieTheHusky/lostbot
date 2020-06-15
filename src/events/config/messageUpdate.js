module.exports = async (client, message, om) => {
	let a = require('../../models/Guild');
	let guild = await a.findOne({ id: message.channel.guild.id });
	if (guild === null) return;
	let oof = guild.logs.action.channel;

	if (!oof || !guild.logs.action.enabled) return;
	let yellow = require('../../config').colours.yellow;
	if (message.author.bot) return;
	// https://discordapp.com/channels/689243278666760201/689243480266244200/704162230966550618
	let url = `https://discordapp.com/channels/${message.channel.guild.id}/${message.channel.id}/${message.id}`;
	if (om.content === message.content) return;
	client.createMessage(oof, {
		embed: {
			title: 'Message Edited',
			description: `[View Message](${url})\nA message was edited by ${message.author.mention} in ${message.channel
				.mention}.`,
			fields: [
				{
					name: 'Old Message',
					value: om.content,
					inline: true
				},
				{
					name: 'New Message',
					value: message.content,
					inline: true
				}
			],
			timestamp: new Date(),
			author: { name: `|  ${message.channel.guild.name}`, icon_url: message.author.avatarURL },
			footer: { text: `User ID: ${message.author.id}` },
			color: Number(yellow)
		}
	});
};
