let d;

module.exports = {
	name: 'module',
	description: 'Get information on modules / a specific module',
	category: 'Administration',
	usage: 'module\nmodule [module]',
	example: `module\nmodule logs\nmodule custom`,

	execute: async (message, client, args) => {
		const guil = require('../../models/Guild');
		const guild = await guil.findOne({ id: message.channel.guild.id });

		if (d === undefined) d = guild.prefix;
		const { memberNoPerms } = require('../../rMessages');

		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else {
			if (!args.length) {
				const { online, offline } = require('../../emotes');
				let r = online;
				let e = guild.logs.action.enabled ? 'Enabled' : 'Disabled';
				let p = guild.logs.mod.enabled ? 'Enabled' : 'Disabled';
				if (e || p) {
					r = online;
				} else {
					r = offline;
				}
				let oof = guild.welcome.enabled ? 'Enabled' : 'Disabled';
				let fuck_off = guild.leave.enabled ? 'Enabled' : 'Disabled';
				let de = guild.automod.enabled ? 'Enabled' : 'Disabled';
				let mdo = guild.automod.words.length;
				if (mdo > 0) {
					mdo = 'Enabled';
				} else {
					mdo = 'Disabled';
				}
				let embed = {
					title: 'Overview',
					footer: { text: `To see more information on a module, use '${guild.prefix}module [module]'` },
					description: `__**Logging:**__\n**Action:** ${e}\n**Mod:** ${p}\n\n__**Joins & Leaves**__\n**Joins:**  ${oof}\n**Leaves:** ${fuck_off}\n\n__**Automod:**__\n**Default:** ${de}\n**Server:** ${mdo}\n\n__**Custom Commands:**__\n**Default:** ${guild
						.commands.length > 0
						? 'Disabled'
						: 'Enabled'}\n\n__**Tags:**__\n**Default:** ${guild.tags.length > 0 ? 'Enabled' : 'Disabled'}`,
					color: 0xfffffa
				};
				return message.channel.createMessage({ embed });
			} else if (args[0] === 'tags') {
				let colour;
				if (guild.tags.length > 0) {
					colour = Number(require('../../config').colours.green);
				} else {
					colour = Number(require('../../config').colours.red);
				}

				let embed = {
					title: 'Module: Tags',
					color: colour,
					description: `There is no known issues with this module.\n\n**Prefix:** ${guild.prefix}\n**Enabled:** ${guild
						.tags.length > 0
						? 'True'
						: 'False'}\n**Usage:** ${guild.prefix}tag [tag-name]`,
					footer: { text: `Guild ID: ${message.channel.guild.id}` }
				};
				message.channel.createMessage({ embed });
			} else if (args[0] === 'cc' || args[0] === 'customs' || (args[0] === 'Custom' && args[1] === 'Commands')) {
				let colour;
				if (guild.tags.length > 0) {
					colour = Number(require('../../config').colours.green);
				} else {
					colour = Number(require('../../config').colours.red);
				}

				let embed = {
					title: `Module: Custom Commands`,
					color: colour,
					description: `There is no known issues with this module.\n\n**Prefix:** ${guild.prefix}\n**Enabled:** ${guild
						.commands.length > 0
						? 'True'
						: 'False'}\n**Usage:** ${guild.prefix}[command-name]`,
					footer: { text: `Guld ID: ${message.channel.guild.id}` }
				};
				message.channel.createMessage({ embed });
			} else if (args[0] === 'logging' || args[0] === 'logs') {
				let colour;
				if (guild.logs.action.enabled && guild.logs.mod.enabled) {
					coluor = Number(require('../../config').colours.green);
				} else if (!guild.logs.action.enabled && !guild.logs.mod.enabled) {
					color = Number(require('../../config').colours.red);
				} else {
					colour = Number(require('../../config').colours.green);
				}
				let ye = guild.logs.action.channel;
				if (ye === null) ye = 'None';
				let pp = guild.logs.mod.channel;
				if (ye === null) ye = 'None';
				let embed = {
					title: 'Module: Logging',
					color: colour,
					footer: { text: `Guild ID: ${message.channel.guild.id}` },
					description: `There are no known issues with this module.\n**Prefix:** ${guild.prefix}\n\n__**Action:**__\n**Enabled:** ${guild
						.logs.action.enabled
						? 'True'
						: 'False'}\n**Channel:** ${ye}\n\n__**Moderation**__\n**Enabled:** ${guild.logs.mod.enabled
						? 'True'
						: 'False'}\n**Channel:** ${pp}`
				};
				message.channel.createMessage({ embed });
			} else if (args[0] === 'joins') {
			}
		}
	}
};
