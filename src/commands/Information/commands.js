module.exports = {
	name: 'commands',
	aliases: [ 'cmds' ],
	category: 'Information',
	description: 'Show a full list of Losts commands',
	cooldown: 3,

	execute: async (message) => {
		let admin = [
			'createrole',
			'createchannel',
			'prefix',
			'delrole',
			'automod',
			'custom',
			'tag',
			'modrole',
			'modroles',
			'welcome',
			'log'
		]
			.sort()
			.join('\n');
		let mod = [ 'kick', 'ban', 'softban', 'checknick', 'mute' ].sort().join('\n');
		let util = [ 'ping', 'commands', 'uptime', 'say', 'e-say', 'roles', 'emotes', 'help [command]' ]
			.sort()
			.join('\n');
		let info = [ 'serverinfo', 'info', 'userinfo', 'membercount', 'stats', 'changelog', 'variables', 'logs' ]
			.sort()
			.join('\n');
		let fun = [ 'dadjoke', 'emojify', 'math', 'cat', 'panda' ].sort().join('\n');
		let settings = [ 'prefix', 'log', 'automod', 'custom', 'tag', 'welcome', 'modrole', 'modroles' ]
			.sort()
			.join('\n');

		const GuildSettings = require('../../models/Guild');
		const guild = await GuildSettings.findOne({ id: message.channel.guild.id });
		if (guild.commands === null) guild.commands = {};
		let custom = guild.commands.map((e) => e.name).sort().join(', ');
		let prefix = guild.prefix;
		if (custom.length === 0) custom = 'This server has no Custom Commands.';
		message.channel.createMessage({
			embed: {
				title: 'Commands sorted into their categories.',
				description: `The prefix for **${message.channel.guild
					.name}** is **\`${prefix}\`**.\nTo view information on a command, type \`${prefix}help <command>\`.`,
				fields: [
					{
						name: 'Administration',
						value: admin,
						inline: true
					},
					{
						name: 'Moderation',
						value: mod,
						inline: true
					},
					{
						name: 'Utility',
						value: util,
						inline: true
					},
					{
						name: 'Information',
						value: info,
						inline: true
					},
					{
						name: 'Fun',
						value: fun,
						inline: true
					},
					{
						name: 'Server Settings',
						value: settings,
						inline: true
					},
					{
						name: 'Custom Commands',
						value: custom,
						inline: true
					}
				],
				color: 0xfffffa
			}
		});
	}
};
