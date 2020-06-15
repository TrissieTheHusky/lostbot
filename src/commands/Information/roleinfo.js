const { idle, offline, online, dnd } = require('../../emotes');

module.exports = {
	name: 'roleinfo',
	description: 'Get information about the role provided',
	category: 'Information',

	execute: (message, client, args) => {
		const { provideRoleTo, errorInE, cantFindRole } = require('../../rMessages');
		let role =
			message.channel.guild.roles.find((e) => e.id === args[0]) ||
			message.channel.guild.roles.find((e) => e.mention === args[0]) ||
			message.channel.guild.roles.find((r) => r.name.toLowerCase().includes(args.join(' ').toLowerCase()));
		// let role = message.channel.guild.roles.find((r) => r.id === args[0]);
		// if (!role) {
		// 	// if it's a role name
		// 	// @ts-ignore
		// 	role = message.channel.guild.roles.find((r) => r.name.toLowerCase().includes(args.join(' ').toLowerCase()));
		// }
		if (!role) message.channel.createMessage(cantFindRole);
		else {
			if (!args.length) {
				message.channel.createMessage(`${provideRoleTo} get information on it!`);
			}

			let rca = new Date(role.createdAt).toDateString();
			let rm = `<@&${role.id}>`;
			let col = role.color ? `#${role.color.toString(16).toUpperCase()}` : 'None';
			let hoist = role.hoist ? 'True' : 'False';
			let ment = role.mentionable ? 'True' : 'False';
			let pos = `#${role.position} Out of #${message.channel.guild.roles.size}`;
			let onlinem = role.guild.members.filter((e) => e.roles.includes(role.id) && e.status === 'online').length;
			let offlinem = role.guild.members.filter((e) => e.roles.includes(role.id) && e.status === 'offline').length;
			let idlem = role.guild.members.filter((e) => e.roles.includes(role.id) && e.status === 'idle').length;
			let dndm = role.guild.members.filter((e) => e.roles.includes(role.id) && e.status === 'dnd').length;

			let embed = {
				fields: [
					{
						name: 'Mention',
						value: rm,
						inline: true
					},
					{
						name: 'Mentionable',
						value: ment,
						inline: true
					},
					{
						name: 'Hoisted',
						value: hoist,
						inline: true
					},
					{
						name: 'Position',
						value: pos,
						inline: true
					},
					{
						name: 'ID',
						value: role.id,
						inline: true
					},
					{
						name: 'Colour',
						value: `${col}`,
						inline: true
					},
					{
						name: 'Members',
						value: `${online} Online: ${onlinem}\n${idle} Idle: ${idlem}\n${dnd} Do not Disturb: ${dndm}\n${offline} Offline: ${offlinem}`,
						inline: true
					}
				],
				color: role.color,
				footer: { text: `Created At` },
				timestamp: new Date(role.createdAt),
				author: {
					name: `Role: ${role.name}`,
					icon_url: message.channel.guild.iconURL
				}
			};
			try {
				let permissions = [];
				// if (role.permissions.has('administrator')) {
				// 	permissions.push('Administrator');
				// }
				if (role.permissions.has('manageChannels')) {
					permissions.push('Manage Channels');
				}
				if (role.permissions.has('manageRoles')) {
					permissions.push('Manage Roles');
				}
				if (role.permissions.has('manageNicknames')) {
					permissions.push('Manage Nicknames');
				}
				if (role.permissions.has('manageEmojis')) {
					permissions.push('Manage Emojis');
				}
				if (role.permissions.has('banMembers')) {
					permissions.push('Ban Members');
				}
				if (role.permissions.has('kickMembers')) {
					permissions.push('Kick Members');
				}
				if (role.permissions.has('mentionEveryone')) {
					permissions.push('Mention Everyone');
				}
				if (role.permissions.has('manageMessages')) {
					permissions.push('Manage Messages');
				}
				if (role.permissions.has('viewAuditLog')) {
					permissions.push('View Audit Log');
				}
				if (permissions.length > 0) {
					embed.fields.push({ name: 'Permissions', value: permissions.join(', ') });
				}
				message.channel.createMessage({ embed });
			} catch (e) {
				console.log(e);
				message.channel.createMessage(errorInE);
			}
		}
	}
};
