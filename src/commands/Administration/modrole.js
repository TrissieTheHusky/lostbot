module.exports = {
	name: 'modrole',
	description: 'Add server moderators',
	category: 'Administration',

	execute: async (message, client, args) => {
		const { memberNoPerms, errorInE, cantFindRole } = require('../../rMessages');
		const Guild = require('../../models/Guild');
		const guild = await Guild.findOne({ id: message.channel.guild.id });
		const role =
			message.channel.guild.roles.find((e) => e.id === args[0]) ||
			message.channel.guild.roles.find((e) => e.mention === args[0]) ||
			message.channel.guild.roles.find((r) => r.name.toLowerCase().includes(args.join(' ').toLowerCase()));
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(`Please provide the role you want to set as the moderators role!`);
		} else if (role.id === message.channel.guild.id || role.mention === `<@&${message.channel.guild.id}`) {
			return message.channel.createMessage(cantFindRole);
		} else if (!role || role === undefined) {
			return message.channel.createMessage(cantFindRole);
		} else {
			try {
				// wuser.roles
				// 	.map((r) => message.channel.guild.roles.get(r))
				// 	.sort((a, b) => b.position - a.position)
				// 	.map((r) => `<@&${r.id}>`)
				// 	.join(' ');
				await guild.updateOne({ $push: { 'mod.roles': role.id } });
				await message.channel.createMessage(`Successfully set the modrole to **${role.name}**!`);
			} catch (e) {
				console.log(e);
				message.channel.createMessage(errorInE);
			}
		}

		// 	if (!role) return message.channel.createMessage(cantFindRole);
		// 	else {
		// 		await guild.updateOne({ $push: { 'mod.roles': role.id } });
		// 		await message.channel.createMessage(`Successfully set the modrole to **${role.name}**!`);
		// 	}
		//	}
	}
};
