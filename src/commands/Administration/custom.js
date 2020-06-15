module.exports = {
	name: 'custom',
	description: 'Create a command, show or remove commands',
	aliases: ['cc'],
	category: 'Administration',
	cooldown: 4,

	usage: 'custom show\ncustom <name> <response>\ncustom remove <name>\na!hello',
	example: 'custom show\ncustom create Lost @OfficiallyLost Hi\ncustom create Baguette @Baguette Oui!\ncustom oof aww, {member} died in ROBLOX!\ncustom information ServerID: {serverID} | My ID: {memberID}\ncustom remove information',

	execute: async (message, client, args) => {
		const {
			memberNoPerms
		} = require('../../rMessages');
		const me = require('../../models/Guild');
		const guild = await me.findOne({
			id: message.channel.guild.id
		});
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(`✘ Please provide if you want to create, show or remove commands  `);
		} else if (args[0] === 'create') {
			if (!args[1]) {
				return message.channel.createMessage(`✘ Please provide the name the commands`);
			} else if (!args[2]) {
				return message.channel.createMessage(`✘ Please provide the response for the command!`);
			} else if (guild.commands.find((e) => e.name === args[1]) !== undefined) {
				return message.channel.createMessage(`✘ That command already exists!`)
			} else {
				await guild.updateOne({
					$push: {
						commands: {
							name: args[1],
							response: args.slice(2).join(' ')
						}
					}
				});
				await message.channel.createMessage(`Successfully created a command with the name of \`${args[1]}\`!`);
			}
		} else if (args[0] == 'show') {
			let yy;
			let ye;
			if (guild.commands === null) {
				yy = 'This server has no Custom Commands';
			} else {
				yy = guild.commands.map((e) => e.name);
				ye = yy.join(', ');
			}

			message.channel.createMessage({
				embed: {
					title: `Commands - ${yy.length}`,
					description: `${ye}`,
					color: 0xfffffa,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					}
				}
			});
		} else if (args[0] === 'remove') {
			if (!args[1]) {
				return message.channel.createMessage('Please provide the command to remove!')
			} else if (guild.commands.find((e) => e.name === args[1]) === undefined) {
				return message.channel.createMessage(`✘ I could not find that command!`)
			} else {
				await guild.updateOne({
					$pull: {
						commands: {
							name: args[1]
						}
					}
				});
				await message.channel.createMessage(`Successfully removed the \`${args[1]}\` command.`);
			}
		} else {

		}
	}
};