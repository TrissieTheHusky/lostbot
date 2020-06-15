module.exports = {
	name: 'help',
	category: 'Information',
	description: 'Get help on a particular command or just general help',
	usage: 'help <command>',
	example: 'help help',
	cooldown: 2,

	execute: async (message, client, args) => {
		const gS = require('../../models/Guild');
		const guild = await gS.findOne({ id: message.channel.guild.id });
		const prefix = guild.prefix;
		let defh;
		if (!args.length) {
			await message.channel.createMessage({
				embed: {
					//thumbnail: { url: client.user.avatarURL },
					description: `The prefix **${message.channel.guild
						.name}** is **\`${prefix}\`**\nTo view a full list of commands type **\`${prefix}commands\`**\nTo view more information about a command, type **\`${prefix}help [command]\`**\n\n[Invite Me](https://discordapp.com/oauth2/authorize?client_id=${client
						.user.id}&scope=bot&permissions=2146958847)\n[Support Server](https://discord.gg/FWTRPS9)`,
					author: { name: client.user.username, icon_url: client.user.avatarURL }
				}
			});
		} else {
			const name = args[0].toLowerCase();
			const command =
				client.commands.get(name) || client.commands.find((c) => c.aliases && c.aliases.includes(name));
			if (!command) 
				return message.channel.createMessage({
					content: 'I could not find that command, but this may help:',
					embed: {
						//thumbnail: { url: client.user.avatarURL },
						description: `The prefix **${message.channel.guild
							.name}** is **\`${prefix}\`**\nTo view a full list of commands type **\`${prefix}commands\`**\nTo view more information about a command, type **\`${prefix}help [command]\`**\n\n[Invite Me](https://discordapp.com/oauth2/authorize?client_id=${client
							.user.id}&scope=bot&permissions=2146958847)\n[Support Server](https://discord.gg/FWTRPS9)`,
						author: { name: client.user.username, icon_url: client.user.avatarURL }
					}
				});
			
			if (command.hidden)
				return message.channel.createMessage({
					content: 'I could not find that command, but this may help:',
					embed: {
						//thumbnail: { url: client.user.avatarURL },
						description: `The prefix **${message.channel.guild
							.name}** is **\`${prefix}\`**\nTo view a full list of commands type **\`${prefix}commands\`**\nTo view more information about a command, type **\`${prefix}help [command]\`**\n\n[Invite Me](https://discordapp.com/oauth2/authorize?client_id=${client
							.user.id}&scope=bot&permissions=2146958847)\n[Support Server](https://discord.gg/FWTRPS9)`,
						author: { name: client.user.username, icon_url: client.user.avatarURL }
					}
				});

			let lol = [];
			lol.push(`**Name:** ${command.name}`);
			lol.push(`**Category:** ${command.category}`);
			if (command.description) lol.push(`**Description:** ${command.description}`);
			if (command.aliases) lol.push(`**Aliases:** ${command.aliases}`);
			if (command.usage) lol.push(`**Usage:** ${command.usage}`);
			if (command.example) lol.push(`**Example:** ${prefix}${command.example}`);
			if (command.cooldown) lol.push(`**Cooldown:** ${command.cooldown} seconds`);
			let e = command.name.slice(0, 1);
			if (command.usage) {
				oof = `Required - <> | Optional - [] | Prefix - ${prefix}`;
			} else {
				oof = `Prefix - ${prefix}`;
			}
			message.channel.createMessage({
				embed: {
					author: {
						name: `${e.toUpperCase()}${command.name.slice(1)} Help`,
						icon_url: client.user.avatarURL
					},
					description: `${lol.join('\n')}`,
					footer: { text: `${oof}` },
					timestamp: new Date()
				}
			});
		}
	}
};
