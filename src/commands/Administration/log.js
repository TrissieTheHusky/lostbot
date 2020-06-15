module.exports = {
	name: 'log',
	description: 'Configurate the logs module',
	category: 'Administration',

	execute: async (message, client, args) => {
		const { memberNoPerms } = require('../../rMessages');
		const m = require('../../models/Guild');
		const guild = await m.findOne({ id: message.channel.guild.id });
		let channel =
			message.channel.guild.channels.find((e) => e.name === args[2]) ||
			message.channel.guild.channels.find((e) => e.id === args[2]) ||
			message.channel.guild.channels.find((e) => e.mention === args[2]);
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(`✘ You need to provide what you want to configure!`);
		} else if (args[0] === 'action' && args[1] === 'enable') {
			if (guild.logs.action.enabled) {
				return message.channel.createMessage(`✘ This module is **already enabled!**`);
			} else {
				await guild.updateOne({ 'logs.action.enabled': true });
				await message.channel.createMessage(`Successfully **enabled** the action logs module!`);
			}
		} else if (args[0] === 'action' && args[1] === 'disable') {
			if (!guild.logs.action.enabled) {
				return message.channel.createMessage(`✘ This module is **already disabled!**`);
			} else {
				await guild.updateOne({ 'logs.action.enabled': false });
				await message.channel.createMessage(`Successfully **disabled** the action logs module!`);
			}
		} else if (args[0] === 'mod' && args[1] === 'enable') {
			if (guild.logs.mod.enabled) {
				return message.channel.createMessage(`✘ This module is **already enabled!**`);
			} else {
				await guild.updateOne({ 'logs.mod.enabled': true });
				await message.channel.createMessage(`Successfully **enabled** the moderation log module!`);
			}
		} else if (args[0] === 'mod' && args[1] === 'disable') {
			if (!guild.logs.mod.enabled) {
				return message.channel.createMessage(`✘ This module is **already disabled!**`);
			} else {
				await guild.updateOne({ 'logs.mod.enabled': false });
				await message.channel.createMessage(`✘ Successfully **disabled** the moderation log module!`);
			}
		} else if (args[0] === 'action' && args[1] === 'channel') {
			if (!args[2]) {
				return message.channel.createMessage('provide channel');
			} else if (!channel) {
				return message.channel.createMessage(`✘ I could not find that channel!`);
			} else {
				await guild.updateOne({ 'logs.action.channel': channel.id });
				await message.channel.createMessage(`Successfully set the action log channel to ${channel.mention}!`);
			}
		} else if (args[0] === 'mod' && args[1] === 'channel') {
			if (!args[2]) {
				return message.channel.createMessage('provide channel');
			} else if (!channel) {
				return message.channel.createMessage(`✘ I could not find that channel!`);
			} else {
				await guild.updateOne({ 'logs.mod.channel': channel.id });
				await message.channel.createMessage(`Successfully set the mod log channel to ${channel.mention}!`);
			}
		} else if (args[0] === 'action') {
			return message.channel.createMessage(
				`This module is **${guild.logs.action.enabled ? 'enabled' : 'disabled'}.**`
			);
		} else if (args[0] === 'mod') {
			return message.channel.createMessage(
				`This module is **${guild.logs.mod.enabled ? 'enabled' : 'disabled'}.**`
			);
		}
	}
};
