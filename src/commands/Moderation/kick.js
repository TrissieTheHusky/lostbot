module.exports = {
	name: 'kick',
	description: 'Kick a member from the guild',
	category: 'Moderation',
	cooldown: 3,
	example: 'kick @OfficiallyLost being rude!',

	execute: async (message, client, args) => {
		const {
			provideMemberTo,
			memberNoPerms,
			lostNoPerms,
			errorInE,
			moderationActOnMod,
			cantFindMember
		} = require('../../rMessages');
		const g = require('../../models/Guild');
		const guild = await g.findOne({ id: message.channel.guild.id });
		const m = require('../../models/Member');
		const member =
			message.channel.guild.members.find((e) => e.id === args[0]) ||
			message.channel.guild.members.find((e) => e.mention === args[0]) ||
			message.channel.guild.members.find((e) => e.username === args[0]) ||
			message.channel.guild.members.find((e) => e.tag === args[0]);

		if (!guild.mod.roles.some((e) => message.member.roles.includes(e)))
			return message.channel.createMessage(memberNoPerms);
		else if (!args.length) return message.channel.createMessage(`${provideMemberTo} kick!`);
		else if (!member || member === undefined) return message.channel.createMessage(cantFindMember);
		else if (message.channel.guild.members.get(member.id).permission.has('manageGuild'))
			return message.channel.createMessage(moderationActOnMod);
		else if (message.channel.guild.members.get(member.id).permission.has('manageMessages'))
			return message.channel.createMessage(moderationActOnMod);
		else {
			const Member = await m.findOne({ id: member.id });

			try {
				let reason = args.slice(1).join(' ');
				const channel = guild.logs.mod.channel;
				if (!reason) reason = 'No reason provided';
				await Member.updateOne({
					$push: {
						modlogs: {
							'guild.id': message.channel.guild.id,
							'guild.kicks': {
								mod: message.author.id,
								reason: reason.slice(0, 499)
							}
						}
					}
				});
				await guild.updateOne({
					$push: {
						moderations: {
							kick: {
								user: member.id,
								mod: message.author.id,
								reason: reason.slice(0, 499),
								case: guild.moderations.length
							}
						}
					}
				});
				let msg = `Successfully kicked **${member.username}** for ${reason.slice(0, 499)}.`;
				const d = await client.getDMChannel(member.id);
				client
					.createMessage(d.id, `You have been kicked from **${message.channel.guild.name}**.`)
					.catch((e) => {
						msg = `Successfully kicked **${member.username}** for ${reason.slice(
							0,
							499
						)}. They have not been notified.`;
					});
				await message.channel.createMessage(msg);
				await member.kick(reason.slice(0, 499));
				if (channel && guild.logs.mod.enabled) {
					client.createMessage(channel, {
						embed: {
							title: 'Member Kicked',
							description: `A member has been kicked by ${message.member.mention}\nCase: #${guild
								.moderations.length}`,
							fields: [
								{
									name: 'Member',
									value: member.username,
									inline: true
								},
								{
									name: 'Reason',
									value: reason.slice(0, 499),
									inline: true
								}
							],
							timestamp: new Date(),
							color: Number(require('../../config').colours.yellow),
							footer: { text: `User ID: ${member.id}` },
							author: {
								name: `|  ${message.channel.guild.name}`,
								icon_url: message.channel.guild.iconURL
							}
						}
					});
				}
			} catch (e) {
				console.log(e);
				message.channel.createMessage(errorInE);
			}
		}
	}
};
