const { memberNoPerms } = require('..//../rMessages.json');
const { aLoading, online } = require('../../emotes.json');
module.exports = {
	name: 'checknick',
	description: 'Checks users nickname for Discord Invite links',
	category: 'Moderation',
	cooldown: 7,
	execute: async (message, client) => {
		const gs = require('../../models/Guild');
		const guild = await gs.findOne({ id: message.channel.guild.id });
		if (!guild.mod.roles.some((e) => message.member.roles.includes(e)))
			message.channel.createMessage(memberNoPerms);

		const members = message.channel.guild.members.filter(
			(member) => member.nick && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.nick)
		);
		let p = members.map((member) => `${member.mention} - \`${member.id}\`` || 'None');
		let e = await message.channel.createMessage({
			embed: {
				color: 0xfffffa,
				title: `${aLoading} Checking ${message.channel.guild.members.size} members nickname`
			}
		});
		setTimeout(() => {
			e.edit({
				embed: {
					color: 0xfffffa,
					title: `${online} Successfully checked all guild members nickname. `,
					description: `Found ${members.length} with an invite Link.\n${p.join('\n')}`
				}
			});
		}, 3000);

		// 			m.edit({
		// 		embed: {
		// 			color: 0xfffffa,
		// 			title: `${online} Successfully checked all members`,
		// 			description: `${p}`
		// 		}
		// 	});
		// }, 5000);

		// let m = await message.channel.createMessage({
		// 	embed: {
		// 		color: 0xfffffa,
		// 		title: `${aLoading} Checking ${message.channel.guild.members.size} members status...`
		// 	}
		// });
		// let p =
		// 	members.map(
		// 		(member) =>
		// 			`Successfully checked all members in the guild. Found with an invite link.\n${member.mention} - \`${member.id}\``.join(
		// 				'\n'
		// 			)``
		// 	) || 'Successfully checked all members in this guild. Found `0` members with an invite link.';
		// setTimeout(() => {
		// 	m.edit({
		// 		embed: {
		// 			color: 0xfffffa,
		// 			title: `${online} Successfully checked all members`,
		// 			description: `${p}`
		// 		}
		// 	});
		// }, 5000);
	}
};
