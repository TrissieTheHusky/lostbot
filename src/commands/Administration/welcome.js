const { memberNoPerms, errorInE } = require('../../rMessages');

module.exports = {
	name: 'welcome',
	description: 'Configure the welcome module for your server',
	category: 'Administration',
	usage: 'welcome channel <channel>\nwelcome message <message>\nwelcome [enable / disable]',
	example:
		'welcome channel [705575995176124437 / #welcome / welcome]\nwelcome message Welcome {member} to {serverName}!\nwelcome disabled\nwelcome enable',

	execute: async (message, client, args) => {
		const gm = require('../../models/Guild');
		const guild = await gm.findOne({ id: message.channel.guild.id });

		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (args[0] === 'message') {
			try {
				if (!args[1]) {
					return message.channel.createMessage(
						`✘ You need to provide the message for me to greet new members!`
					);
				} else {
					await guild.updateOne({ 'welcome.message': args.slice(1).join(' ') });
					await message.channel.createMessage(
						`Successfully set the welcome message for this server to:\n\`${args.slice(1).join(' ')}\``
					);
				}
			} catch (e) {
				console.log(e);
				message.channel.createMessage(errorInE);
			}
		} else if (args[0] === 'channel') {
			let channel =
				message.channel.guild.channels.find((e) => e.name === args[1]) ||
				message.channel.guild.channels.find((e) => e.id === args[1]) ||
				message.channel.guild.channels.find((e) => e.mention === args[1]);

			if (!channel) {
				return message.channel.createMessage(`✘ I could no find that channel!`);
			} else if (!args[1]) {
				return message.channel.createMessage(`✘ You need to provide the channel for me to greet new members!`);
			} else {
				try {
					await guild.updateOne({ 'welcome.channel': channel.id });
					await message.channel.createMessage(
						`Successfully set the welcome channel for me to greet new members to ${channel.mention}`
					);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorInE);
				}
			}
		} else if (args[0] === 'enable') {
			if (guild.welcome.enabled) {
				return message.channel.createMessage(`✘ This module is already enabled!`);
			} else {
				try {
					await guild.updateOne({ 'welcome.enabled': true });
					await message.channel.createMessage(`Successfully enabled the welcome module!`);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorInE);
				}
			}
		} else if (args[0] === 'disable') {
			if (!guild.welcome.enabled) {
				return message.channel.createMessage(`✘ This module is already disabled!`);
			} else {
				try {
					await guild.updateOne({ 'welcome.enabled': false });
					await message.channel.createMessage(`Successfully disabled the welcome module!`);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorInE);
				}
			}
		} else if (!args.length) {
			return message.channel.createMessage(
				`✘ Please provide if you want to **disable**, **enable**, set the **channel** for me to greet new members or **message**!`
			);
		}
	}
};
