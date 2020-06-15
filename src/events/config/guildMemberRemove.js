module.exports = async (client, guild, member) => {
	let oof = require('../../models/Guild');
	let Guild = await oof.findOne({ id: guild.id });
	let channel = Guild.leave.channel;
	let message = Guild.leave.message;
	//if (Guild.leave.enabled || message !== null || channel !== null) {
	// let msg = message
	// 	.replace('{username}', member.username)
	// 	.replace('{serverName}', guild.name)
	// 	.replace('{size}', guild.memberCount);
	// client.createMessage(channel, msg);
	//}
	let ms = require('pretty-ms');
	let d = Date.now() - member.joinedAt;
	let time = ms(d);
	let roles = member.roles
		.map((r) => guild.roles.get(r))
		.sort((a, b) => b.position - a.position)
		.map((r) => `<@&${r.id}>`)
		.join(' ');
	if (!roles) roles = 'This member had no roles.';

	let embed = {
		title: 'Member Left',
		description: `**Member Count:** ${guild.memberCount}\nA member has left the server.\nThey have been in this server for ${time}`,
		color: Number(require('../../config').colours.red),
		timestamp: new Date(),
		fields: [
			{
				name: 'Member',
				value: member.username,
				inline: true
			},
			{
				name: 'Previous roles',
				value: roles,
				inline: true
			}
		]
	};
	let chan = guild.logs.action.channel;
	if (!chan) return;
	client.createMessage(chan, { embed });
};

// 	if (alchan === null || !alchan) return;
// 	let x = require('pretty-ms');
// 	let diff = Date.now() - member.joinedAt;
// 	let time = x(diff);
// 	let rol = member.roles
// 		.map((r) => guild.roles.get(r))
// 		.sort((a, b) => b.position - a.position)
// 		.map((r) => `<@&${r.id}>`)
// 		.join(' ');
// 	if (!rol) {
// 		rol = 'This member had no roles.';
// 	}
// 	let embed = {
// 		title: 'Member Left',
// 		description: `**Member Count:** ${guild.memberCount}\nA member has left the server.\nThey have been in this server for ${time}`,
// 		color: 0xdb1a1a,
// 		author: { name: ` |  ${guild.name}`, icon_url: member.avatarURL },
// 		timestamp: new Date(),
// 		footer: { text: `User ID: ${member.id}` },
// 		fields: [
// 			{
// 				name: 'Member',
// 				value: member.username,
// 				inline: true
// 			},
// 			{
// 				name: 'Previous Roles',
// 				value: rol,
// 				inline: true
// 			}
// 		]
// 	};
// 	client.createMessage(alchan, { embed });
// };
