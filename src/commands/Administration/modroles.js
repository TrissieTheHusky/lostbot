module.exports = {
	name: 'modroles',
	aliases: [ 'mods', 'listmods' ],
	description: 'View the server moderators',
	category: 'Administration',

	execute: async (message) => {
		const { memberNoPerms } = require('../../rMessages');
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else {
			console.log('ee');
			let c = require('../../models/Guild');
			const guild = await c.findOne({ id: message.channel.guild.id });
			let roles = guild.mod.roles
				.map((r) => message.channel.guild.roles.get(r))
				.sort((a, b) => b.position - a.position)
				.map((r) => `<@&${r.id}>`)
				.join('\n');
			let mods = message.channel.guild.members
				.filter((member) => member.roles.some((role) => guild.mod.roles.includes(role)))
				.map((e) => e.mention)
				.join('\n');

			if (!mods) mods = 'None';
			if (!roles) roles = 'None';
			let embed = {
				title: 'Server Moderators',
				fields: [
					{
						name: 'Roles',
						value: `${roles}`,
						inline: true
					},
					{
						name: 'Mods',
						value: `${mods}`,
						inline: true
					}
				]
			};
			await message.channel.createMessage({ embed });
		}
	}
};
