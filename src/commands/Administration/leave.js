module.exports = {
	name: 'leave',
	description: 'Configure the leave module for your server',
	category: 'Administration',
	usage: 'leave channel <channel>\nleave message <message>\nleave [enable / disable]',
	example:
		'leave channel [705575995176124437 / #goodbye / goodbye]\nleave message Welcome {member} to {serverName}!\nleave disabled\nleaveenable',

	execute: async (message, client, args) => {
		const { memberNoPerms, errorInE } = require('../../rMessages');
		const guil = require('../../models/Guild');
		const guild = await guil.findOne({ 'guild.id': message.channel.guild.id });
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			message.channel.createMessage(
				`✘ Please provide if you want to **disable**, **enable**, set the **channel** for me to see old members out or **message**!`
			);
		} else if (args[0] === 'message'.toLowerCase()) {
			if (!args[1]) {
				return message.channel.createMessage(`✘ Please provide the leave message!`);
			} else {
				try {
					await guild.updateOne({ 'leave.message': args.slice(1).join(' ') });
					await message.channel.createMessage(
						`Successfully set the leave message to:\n\`${args.slice(1)}\`!`
					);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorInE);
				}
			}
		} else if (args[0] === 'channel'.toLowerCase()) {
			if (!args[1]) {
				return message.channel.createMessage('✘ Please provide the leave channel!');
			} else {
				let channel =
					message.channel.guild.channels.find((e) => e.id === args[1]) ||
					message.channel.guild.channels.find((e) => e.name === args[1]) ||
					message.channel.guild.channels.find((e) => e.mention === args[1]);
				if (!channel) {
					return message.channel.createMessage(`✘ I could not find that channel!`);
				}
				try {
					await guild.updateOne({ 'leave.channel': channel.id });
					await message.channel.createMessage(`Successfully set the leave channel to ${channel.mention}!`);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorInE);
				}
			}
		} else if (args[0] === 'enable'.toLowerCase()) {
			if (guild.leave.enabled) {
				return message.channel.createMessage(`✘ This module is already enabled!`);
			} else {
				try {
					await guild.updateOne({ 'leave.enabled': true });
					await message.channel.createMessage(`Successfully enabled the module!`);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorinE);
				}
			}
		} else if (args[0] === 'disable'.toLowerCase()) {
			if (!guild.leave.enabled) {
				return message.channel.createMessage(`✘ This module is already disabled!`);
			} else {
				try {
					await guild.updateOne({ 'leave.enabled': false });
					await message.channel.createMessage(`Successfully disabled the module!`);
				} catch (e) {
					console.log(e);
					message.channel.createMessage(errorinE);
				}
			}
		}
	}
};
