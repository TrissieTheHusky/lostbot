const { memberNoPerms, lostNoPerms, errorInE, provideRoleTo } = require('..//..//rMessages.json');

module.exports = {
	name: 'createrole',
	description: 'Create a role in a guild',
	category: 'Administration',
	aliases: [ 'crole', 'addrole' ],

	execute: async (message, client, args) => {
		if (!message.member.permission.has('manageGuild')) {
			message.channel.createMessage(memberNoPerms);
		}
		if (!message.channel.guild.members.get(client.user.id).permission.has('manageGuild')) {
			message.channel.createMessage(lostNoPerms);
		}
		try {
			if (!args.length) {
				message.channel.createMessage(`${provideRoleTo} create!`);
			} else {
				let oof = args.join(' ');
				if (!oof) message.channel.createMessage(`${provideRoleTo} create!`);
				client
					.createRole(message.channel.guild.id, {
						name: oof
					})
					.then((e) => message.channel.createMessage(`Successfully created a **${oof}** role.`));
			}
		} catch (e) {
			console.log(e);
			message.channel.createMessage(errorInE);
		}
	}
};
