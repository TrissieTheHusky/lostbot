module.exports = {
	name: 'softban',
	description: 'Kick a member from a guild but delete their messages',
	category: 'Moderation',
	cooldown: 4,
	usage: 'softban <user> [reason]',
	example: 'softban @baguette spamming',

	execute: async (message, client, args) => {
		if (!message.member.permission.has('kickMembers')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!message.channel.guild.members.get(client.user.id).permission.has('kickMembers')) {
			message.channel.createMessage(lostNoPerms);
		} else {
			let resolvedUser =
				args[0] !== undefined ? message.channel.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
			if (resolvedUser === null) return;
			const toBan = message.channel.guild.members.get(resolvedUser.id);
			const { theLost, llama } = require('../../config');
			if (!toBan) {
				return message.channel.createMessage(`${provideMemberTo} to softban!`);
			} else {
				if (toBan.id === message.author.id) {
					return message.channel.createMessage(`✘ I cannot softban server moderators!`);
				} else if (toBan.id === client.user.id) {
					return message.channel.createMessage(`✘ I cannot softban this user!`);
				} else if (toBan.id === theLost) {
					return message.channel.createMessage(`✘ I cannot softban this user!`);
				} else if (toBan.id === llama) {
					return message.channel.createMessage(`✘ I cannot softban this user!`);
				} else if (message.channel.guild.members.get(toBan.id).permission.has('manageGuild')) {
					return message.channel.createMessage(`✘ I cannot softban sever moderators!`);
				} else if (message.channel.guild.members.get(toBan.id).permission.has('manageMessages')) {
					return message.channel.createMessage(`✘ I cannot softban server moderators!`);
				} else if (message.channel.guild.members.get(toBan.id).permission.has('kickMembers')) {
					return message.channel.createMessage(`✘ I cannot softban server moderators`);
				} else if (message.channel.guild.members.get(toBam.id).permission.has('banMembers')) {
					return message.channel.createMessage(`✘ I cannot softban server moderators!`);
				}
				try {
					let reason = args.slice(1).join(' ');
					if (!reason) reason = 'No reason provided.';
					let dm = await client.getDMChannel(toBan.id);
					let o = dm.id;
					let a = `You have been softbanned from **${message.channel.guild.name}**.`;
					let p = `Successfully softbanned **${toBan.username}** for ${reason}.`;
					if (reason !== 'No reason provided.') {
						p = `Successfully softbanned **${toBan.username}**.`;
						a = `You have been softbanned from **${message.channel.guild.name}** for ${reason}.`;
					}

					message.channel.createMessage(`${p}`);
					await client.createMessage(o, `${a}`);
					await toBan.ban(7).catch((e) => {
						console.log(e);
						message.channel.createMessage(errorInE);
					});
					await toBan.unban(reason).catch((e) => {
						console.log(e);
						message.channel.createMessage(errorInE);
					});
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorInE);
				}
			}
		}
	}
};
