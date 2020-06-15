module.exports = {
	name: 'delrole',
	aliases: [ 'removerole' ],
	description: 'Delete a role from the guild',
	category: 'Administration',

	execute: async (message, client, args) => {
		let { memberNoPerms, lostNoPerms, errorInE, provideRoleTo } = require('../../rMessages.json');
		if (!args.length) {
			message.channel.createMessage(provideRoleTo + ' delete!');
		} else {
			let Role =
				message.channel.guild.roles.find((e) => e.id === args[0]) ||
				message.channel.guild.roles.find((e) => e.mention === args[0]);

			if (!message.member.permission.has('manageGuild')) {
				message.channel.createMessage(memberNoPerms);
			}
			if (!message.channel.guild.members.get(client.user.id).permission.has('manageGuild')) {
				message.channel.createMessage(lostNoPerms);
			}
			if (!Role) {
				message.channel.createMessage(
					`I cannot find a role to delete! Please provide the **id** or the **mention** of the role!`
				);
			}
			let reason = args.join(' ').slice(1);
			if (!reason) reason = 'No reason provided';
			client.deleteRole(message.channel.guild.id, Role.id, reason);
			await message.channel.createMessage(`Successfully deleted the **${Role.name}** role.`);
		}
	}
};
