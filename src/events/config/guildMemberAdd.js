module.exports = async (client, guild, member) => {
	// const guildS = require('../../models/Guild');
	// let Guild = await guildS.findOne({ id: guild.id });
	// const channel = Guild.welcome.channel;
	// const Message = Guild.welcome.message;
	// const finalMessage = Message.replace('{member}', member.mention)
	// 	.replace('{size}', guild.members.size)
	// 	.replace('{username}', member.username)
	// 	.replace('{serverName}', guild.name);
	// client.createMessage(channel, `${finalMessage}`);
	// //}
	// let embed = {
	// 	title: 'Member Joined',
	// 	description: `A member has just joined the server. This server is now at ${guild.memberCount} members.`,
	// 	fields: [
	// 		{
	// 			name: 'Member',
	// 			value: member.mention,
	// 			inline: true
	// 		},
	// 		{
	// 			name: 'Member Created At',
	// 			value: new Date(member.createdAt).toDateString(),
	// 			inline: true
	// 		}
	// 	],
	// 	color: 0x10eb23,
	// 	timestamp: new Date(),
	// 	footer: { text: `User ID: ${member.id}` },
	// 	author: { name: ` |  ${guild.name}`, icon_url: member.avatarURL }
	// };
	// if (member.createdAt < 864000000) {
	// 	embed.description = `A member has just joined the server. This server is now at ${guild.memberCount}.\n**Warning! ⚒️\nThis is account has been flagged for suspicious activity.**`;
	// }
	// let chan = guild.logs.action.channel;
	// //	if (chan && guild.logs.action.enabled) {
	// client.createMessage(chan, { embed });
	// //	}
};
