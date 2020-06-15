const {
	lostNoPerms,
	memberNoPerms,
	cantFindMember,
	lostAdminModeration,
	provideMemberTo,
	moderationActOnMod
} = require('../../rMessages');
module.exports = {
	name: 'ban',
	description: 'Ban members from the guild',
	category: 'Moderation',
	usage: 'ban <member> [reason]',
	example: 'ban @OfficiallyLost found his way home',
	cooldown: 3,

	execute: async (message, client, args) => {
		const a = require('../../models/Guild');
		const guild = await a.findOne({ id: message.chnnnel.guild.id });
		if (guild.mod.roles.some((e) => message.member.roles.includes(e)))
			return message.channel.createMessage(memberNoPerms);
		else if (!message.channel.guild.members.get(client.user.id).permission.has('banMembers'))
			return message.channel.createMessage(lostNoPerms);
		else {
			const member =
				message.channel.guild.members.find((e) => e.id === args[0]) ||
				message.channel.guild.members.find((e) => e.mention === args[0]) ||
				message.channel.guild.members.find((e) => e.username === args[0]) ||
				message.channel.guild.members.find((e) => `${e.username}#${e.discriminator}` === args[0]);
			if (!args.length) return message.channel.createMessage(`${provideMemberTo} ban!`);
			else if (!member) return message.channel.createMessage(cantFindMember);
			else if (member.id === message.author.id) return message.channel.createMessage(moderationActOnMod);
			else if (member.id === client.user.id) return message.channel.createMessage(moderationActOnMod);
			else if (member.id === require('../../config').theLost)
				return message.channel.createMessage(lostAdminModeration);
			else if (member.id === require('../../config').llama)
				return message.channel.createMessage(lostAdminModeration);
			else if (guild.mod.roles.some((e) => member.roles.includes(e)))
				return message.channel.createMessage(moderationActOnMod);
			else if (message.channel.guild.members.get(member.id).permission.has('manageGuild'))
				return message.channel.createMessage(moderationActOnMod);
			else {
				const lockLength = args[1].match(/[a-z]+|[^a-z]+/gi);
				const length = Number(lockLength[0]);
				const unit = lockLength[1];
				momentMilliseconds = moment.duration(length, unit).asMilliseconds();

				reason = momentMilliseconds ? args.slice(2).join(' ') : args.slice(1).join(' ');
				if (!reason) reason = 'No reason provided.';
				let o = await client.getDMChannel(member.id);
				let dm = o.id;
				const channel = guild.logs.mod.channel;
				if (!channel)
					return message.channel.createMessage(
						`There is no modlog set up! Please set up the modlog channel!`
					);
				else {
					client
						.createMessage(dm, `You have been banned from **${message.channel.guild.name}** for ${reason}`)
						.then(async () => await member.ban(7, reason));
					await message.channel.createMessage(`Successfully banned **${member.username}** for ${reason}`);
					setTimeout(async () => {
						await member.unban('Ban was temporary');
						if (guild.logs.mod.enabled && guild.logs.mod.channel !== null) {
							client.createMessage(channel, {
								embed: {
									title: 'Member Unbanned',
									description: `A member has been unbanned by ${client.user.mention}`,
									color: Number(require('../../config').yellow),
									timestamp: new Date(),
									footer: { text: `User ID: ${member.id}` },
									fields: [
										{
											name: 'Member',
											value: member.username + '#' + member.discriminator,
											inline: true
										},
										{
											name: 'Reason',
											value: 'Ban was temporary',
											inline: true
										}
									]
								}
							});
						}
					});
				}
			}
		}
		// if (!message.member.permission.has('banMembers')) {
		// 	return message.channel.createMessage(memberNoPerms);
		// } else if (!message.channel.guild.members.get(client.user.id).permission.has('banMembers')) {
		// 	message.channel.createMessage(lostNoPerms);
		// } else {
		// 	let resolvedUser =
		// 		args[0] !== undefined ? message.channel.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
		// 	if (resolvedUser === null) return;
		// 	const toBan = message.channel.guild.members.get(resolvedUser.id);
		// 	const { theLost, llama } = require('../../config');
		// 	if (!toBan) {
		// 		return message.channel.createMessage(`${provideMemberTo} to ban!`);
		// 	} else {
		// 		if (toBan.id === message.author.id) {
		// 			return message.channel.createMessage(`✘ cannot ban server moderators!`);
		// 		} else if (toBan.id === client.user.id) {
		// 			return message.channel.createMessage(`✘ I cannot ban this user!`);
		// 		} else if (toBan.id === theLost) {
		// 			return message.channel.createMessage(`✘ I cannot ban this user!`);
		// 		} else if (toBan.id === llama) {
		// 			return message.channel.createMessage(`✘ I cannot ban this user!`);
		// 		} else if (message.channel.guild.members.get(toBan.id).permission.has('manageGuild')) {
		// 			return message.channel.createMessage(`✘ I cannot ban sever moderators!`);
		// 		} else if (message.channel.guild.members.get(toBan.id).permission.has('manageMessages')) {
		// 			return message.channel.createMessage(`✘ I cannot ban server moderators!`);
		// 		} else if (message.channel.guild.members.get(toBan.id).permission.has('kickMembers')) {
		// 			return message.channel.createMessage(`✘ I cannot ban server moderators`);
		// 		} else if (message.channel.guild.members.get(toBam.id).permission.has('banMembers')) {
		// 			return message.channel.createMessage(`✘ I cannot ban server moderators!`);
		// 		}
		// 		try {
		// 			let reason = args.slice(1).join(' ');
		// 			if (!reason) reason = 'No reason provided.';
		// 			let dm = await client.getDMChannel(toBan.id);
		// 			let o = dm.id;
		// 			let a = `You have been banned from **${message.channel.guild.name}**.`;
		// 			let p = `Successfully banned **${toBan.username}** for ${reason}.`;
		// 			if (reason !== 'No reason provided.') {
		// 				p = `Successfully banned **${toBan.username}**.`;
		// 				a = `You have been banned from **${message.channel.guild.name}** for ${reason}.`;
		// 			}

		// 			message.channel.createMessage(`${p}`);
		// 			await client.createMessage(o, `${a}`);
		// 			await toBan.ban(7, reason).catch((e) => {
		// 				console.log(e);
		// 				message.channel.createMessage(errorInE);
		// 			});
		// 		} catch (e) {
		// 			console.log(e);
		// 			message.channel.createMessage(errorInE);
		// 		}
		// 	}
		// }
	}
};
