module.exports = {
	name: 'logs',
	description: 'Check I log to your action log channel',
	aliases: [ 'checklogs' ],
	category: 'Moderation',

	execute: async (message, client) => {
		const { memberNoPerms, errorInE } = require('../../rMessages.json');
		if (!message.member.permission.has('viewAuditLogs')) {
			return message.channel.createMessage(memberNoPerms);
		} else {
			try {
				let guil = require('../../models/Guild');
				let guild = await guil.findOne({ id: message.channel.guild.id });
				let channel = guild.alchan;

				let yeet = `The action log channel for **${message.channel.guild.name}** is **<#${channel}>**`;

				let embed = {
					title: 'What I log to your action log channel.',
					description: `${yeet}`,
					fields: [
						{
							name: 'Enabled',
							value: `Channel Create\nChannel Delete\nChannel Update - Name, type, topic and position\nMember Joined\nMembers' Nickname Changed\nRole Created\nRole Deleted\nInvite Created\nInvite Deleted\nMessage Deleted\nMessage Reaction Remove\nMessage Edited\nServer Updated - Name, region, owner, verification level\nVoice Channel Joined\nVoice Channel Switched\nVoice Channel Leaved`
						}
					]
				};

				message.channel.createMessage({ embed });
			} catch (e) {
				console.log(e);
				message.channel.createMessage(errorInE);
			}
		}
	}
};
