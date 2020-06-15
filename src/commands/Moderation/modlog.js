module.exports = {
	name: 'modlogs',
	description: 'View a users modertion log',
	category: 'Moderation',
	cooldown: 4,

	execute: async (message, client, args) => {
		const { memberNoPerms, provideMemberTo, cantFindMember } = require('../../rMessages');
		const g = require('../../models/Guild');
		const m = require('../../models/Member');
		const guild = await g.findOne({ id: message.channel.guild.id });
		const member =
			message.channel.guild.members.find(
				(m) =>
					m.mention.replace('!', '') === args.join(' ').replace('!', '') ||
					`${m.username}#${m.discriminator}` === args.join(' ') ||
					m.username === args.join(' ') ||
					m.id === args.join(' ') ||
					m.nick === args.join(' ')
			) || // Exact match for mention, username+discrim, username and user ID
			message.channel.guild.members.find(
				(m) =>
					`${m.username.toLowerCase()}#${m.discriminator}` === args.join(' ').toLowerCase() ||
					m.username.toLowerCase() === args.join(' ').toLowerCase() ||
					(m.nick && m.nick.toLowerCase() === args.join(' ').toLowerCase())
			) || // Case insensitive match for username+discrim, username
			message.channel.guild.members.find(
				(m) =>
					m.username.toLowerCase().startsWith(args.join(' ').toLowerCase()) ||
					(m.nick && m.nick.toLowerCase().startsWith(args.join(' ').toLowerCase()))
			);
		if (!guild.mod.roles.some((e) => message.member.roles.includes(e))) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(`${provideMemberTo} view their moderation history!`);
		} else if (!member) {
			return message.channel.createMessage(cantFindMember);
		} else {
			const km = await client.getRESTUser(
				guild.moderations.filter((e) => e.kick.user === member.id).map((e) => e.kick.mod)
			);
			const kmod = km;
			const kick = guild.moderations
				.filter((e) => e.kick.user === member.id)
				.map(
					(e) =>
						`__**Kick:**__\n**Mod:** ${e.kick.mod}\n**Reason:** ${e.kick.reason}\n**Case:** #${e.kick.case}`
				)
				.join('\n-\n');
			let modUsernames = {};
			let filtered = guild.moderations.filter((e) => e.kick.user === member.id);
			for (let moderation of filtered) {
				if (!modUsernames[moderation.kick.mod]) {
					modUsernames[moderation.kick.mod] = (await getRESTUser(moderation.kick.mod)).username;
				}
				let username = modUsernames[moderation.kick.mod];
			}
			message.channel.createMessage({
				embed: {
					title: `Modlogs for ${member.username}`,
					description: kick
				}
			});
		}
	}
};
