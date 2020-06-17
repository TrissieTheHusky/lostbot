module.exports = {
	name: 'prefix',
	description: 'Change the prefix of the server or check it',
	category: 'Administration',
	aliases: [ 'suffix', 'setpredix' ],
	example: 'prefix a!',
	usage: 'prefix <prefix>',

	execute: async (message, client, args) => {
		const oof = require('../../models/Guild');
		const { memberNoPerms, errorInE } = require('../../rMessages');
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else {
			try {
				let guild = await oof.findOne({ id: message.channel.guild.id });
				if (!args.length) {
					return message.channel.createMessage(
						`The prefix for **${message.channel.guild.name}** is **\`${guild.prefix}\`.**`
					);
				} else {
					await guild.updateOne({ prefix: args.join(' ') });
					await message.channel.createMessage(
						`Successfully changed the prefix to **\`${args.join(' ')}\`!**`
					);
				}
			} catch (e) {
				console.log(e);
				message.channel.createMessage(errorInE);
			}
		}
	}
};
