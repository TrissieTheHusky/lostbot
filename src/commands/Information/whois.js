const { dnd, idle, offline, online, richpresence, lost } = require('..//..//emotes.json');

module.exports = {
	name: 'userinfo',
	aliases: [ 'w', 'uinfo', 'whois' ],
	description: 'Get information about members.',
	usage: 'userinfo\nuserinfo <member>',
	example: 'userinfo @OfficiallyLost\nuserinfo',
	category: 'Information',

	execute: async (message, client, args) => {
		const eris = require('eris');
		const { provideMemberTo, errorInE } = require('../../rMessages');
		let wuser = client.getMember(message.channel.guild, args.join(' '));
		if (!args[0]) wuser = message.member;
		if (!wuser) {
			message.channel.createMessage(`${provideMemberTo} get information on them!`);
		} else {
			let a = [];
			if (wuser.size >= 1) a = `Found **${wuser.size}** members.`;
			let mention = wuser.mention;
			let id = wuser.id;
			let nick = wuser.nick ? wuser.nick : 'None';
			if (wuser.game === null) wuser.game = 'Unknown';
			if (wuser.game === undefined) wuser.game = 'Unknown';

			let Game = wuser.game.name;

			let gS = 'Activity:';
			if (wuser.game.type === 0) {
				gS = `Playing:`;
			} else if (wuser.game.type === 1) {
				gS = `Streaming:`;
			} else if (wuser.game.type === 2) {
				gS = `Listening To:`;
			} else if (wuser.game.type === 3) {
				gS = `Watching:`;
			} else if (wuser.game.type === 4) {
				gS = `State:`;
				Game = `${wuser.game.state}`;
			}

			if (Game === undefined || Game === null) {
				Game = 'Nothing';
			}

			let jP =
				message.channel.guild.members.map((a) => a.joinedAt).sort((a, b) => a - b).indexOf(wuser.joinedAt) + 1;
			let status = wuser.status;

			if (status === 'online') status = `${online} Online`;
			if (status === 'offline') status = `${offline} Offline`;
			if (status === 'idle') status = `${idle} Idle`;
			if (status === 'dnd') status = `${dnd} Do not Disturb`;
			let cR = new Date(wuser.createdAt).toDateString();
			let jR = new Date(wuser.joinedAt).toDateString();
			let ib = wuser.bot ? 'True' : 'False';
			let rC = wuser.roles.length;

			let x = [];
			let p = [];
			if (wuser.id === message.channel.guild.ownerID) {
				x.push('- **Server Owner**');
			}
			if (wuser.permission.has('administrator') && wuser.id !== message.channel.guild.ownerID) {
				x.push('- **Server Admin**');
			}
			if (
				wuser.permission.has('manageGuild') &&
				wuser.id !== message.channel.guild.ownerID &&
				!wuser.permission.has('administrator')
			) {
				x.push('- **Server Manager**');
			}

			try {
				let permissions = [];
				let Roles = wuser.roles
					.map((r) => message.channel.guild.roles.get(r))
					.sort((a, b) => b.position - a.position)
					.map((r) => `<@&${r.id}>`)
					.join(' ');
				if (wuser.permission.has('manageChannels')) {
					permissions.push('Manage Channels');
				}
				if (wuser.permission.has('manageRoles')) {
					permissions.push('Manage Roles');
				}
				if (wuser.permission.has('manageNicknames')) {
					permissions.push('Manage Nicknames');
				}
				if (wuser.permission.has('manageEmojis')) {
					permissions.push('Manage Emojis');
				}
				if (wuser.permission.has('banMembers')) {
					permissions.push('Ban Members');
				}
				if (wuser.permission.has('kickMembers')) {
					permissions.push('Kick Members');
				}
				if (wuser.permission.has('mentionEveryone')) {
					permissions.push('Mention Everyone');
				}
				if (wuser.permission.has('manageMessages')) {
					permissions.push('Manage Messages');
				}
				if (wuser.permission.has('viewAuditLog')) {
					permissions.push('View Audit Log');
				}
				let op = [];
				if (wuser.game.type === 0 || wuser.game.type === 1 || wuser.game.type === 2 || wuser.game.type === 4) {
					op.push('**Game Type:** ' + wuser.game.type);
				}
				let msc = client.guilds.filter((e) => e.members.find((a) => a.id == wuser.id)).length;
				let gt = wuser.game.type;
				const roles = message.channel.guild.roles;
				let highestRole = wuser.roles.reduce((highestRole, currentRoleId) => {
					const currentRole = roles.find((role) => role.id === currentRoleId);
					if (highestRole === null) highestRole = currentRole;
					return highestRole.position > currentRole.position ? highestRole : currentRole;
				}, null);
				if (highestRole === null) {
					highestRole = { color: 0 };
				}
				let platform = `${offline} Unknown`;
				// let clientStatus = wuser.clientStatus;
				// if (platform === undefined || clientStatus === undefined) {
				// 	platform = `${offline} Offline`;
				// 	clientStatus = 'off';
				// }
				// if (clientStatus.web === 'online' || clientStatus.web === 'idle' || clientStatus.web === 'dnd') {
				// 	platform = ':globe_with_meridians: Web';
				// } else if (
				// 	clientStatus.desktop === 'online' ||
				// 	clientStatus.desktop === 'idle' ||
				// 	clientStatus.desktop === 'dnd'
				// ) {
				// 	platform = ':desktop: Desktop';
				// } else if (
				// 	clientStatus.mobile === 'online' ||
				// 	clientStatus.mobile === 'idle' ||
				// 	clientStatus.mobile === 'dnd'
				// ) {
				// 	platform = ':iphone: Mobile';
				// }
				let e = require('ms');
				let c = e(Date.now() - wuser.createdAt);
				let j = e(Date.now() - wuser.joinedAt);

				let col = highestRole.color;
				let embed = {
					author: { name: `${wuser.username}#${wuser.discriminator}`, icon_url: wuser.avatarURL },
					thumbnail: { url: wuser.avatarURL },
					color: col,
					fields: [
						{
							name: '**General Information**',
							value: `**Mention:** ${mention}\n**ID:** \`${id}\`\n**Nickname:** ${nick}\n**${gS}** ${Game}\n**Platform:** ${platform}\n**Presence:** ${status}\n**Created At:** ${cR} | ${c} \n**Joined At:** ${jR} | ${j} `,
							inline: false
						},
						{
							name: '**Additional Information**',
							value: `**User Bot:** ${ib}\n**Join Position:** ${jP}\n**Colour:** #${col
								.toString(16)
								.toUpperCase()}\n**Role Count:** ${rC}\n**Permission Count:** ${permissions.length}\n**Mutual Server Count:** ${msc}\n${op}`,
							inline: false
						}
					]
				};
				if (wuser.roles.length > 0) {
					embed.fields[2] = { name: `**Roles**`, value: Roles };
					let col = highestRole.color;
					let Col = `#${col.toString(16)}`;
				}
				if (permissions.length > 0) {
					embed.fields[3] = { name: `**Permissions** ${x}`, value: permissions.join(', ') };
				}

				if (wuser.id === '475371795185139712') {
					embed.description = `**Lost Administrator**`;
				}
				if (wuser.id === '692787014193381419') {
					embed.description = `**Lost Staff**`;
				}
				if (wuser.id === '599020649222242315') {
					embed.description = '**Lost Administration**';
				}
				if (wuser.id === '556938379875319844') {
					embed.description = `**Lost Contributor**`;
				}
				if (wuser.id === '533069055784124437') {
					embed.description = `**Lost Contributor**\n**Being Awesome**`;
				}

				message.channel.createMessage({ content: a, embed: embed });
			} catch (e) {
				console.log(e);
				client.createMessage(message.channel.id, errorInE);
			}
		}
	}
};
