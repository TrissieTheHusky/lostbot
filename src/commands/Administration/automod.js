module.exports = {
	name: 'automod',
	description:
		'Toggle Lost to automatically moderate your server, add blacklisted words, remove blacklisted words or check the all blacklisted words',
	category: 'Administration',
	usage:
		'automod [enable | disable]\nautomod add <new word to blacklist>\nautomod remove-all\nautomod remove <blacklisted word>\nautomod show',
	example: 'automod enable\nautomod disable\nautomod add iopol\nautomod remove-all\nautomod remove oof\nautomod show',

	execute: async (message, client, args) => {
		const { memberNoPerms, errorInE } = require('../../rMessages');
		const aa = require('../../models/Guild');
		const guild = await aa.findOne({ id: message.channel.guild.id });
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(
				`Automoderation for **${message.channel.guild.name}** is **${guild.automod.enabled
					? 'enabled'
					: 'disabled'}**`
			);
		} else if (args[0] === 'enable') {
			if (guild.automod.enabled) {
				return message.channel.createMessage(`✘ Automoderation is **already enabled** for this server!`);
			} else {
				await guild.updateOne({ 'automod.enabled': true });
				await message.channel.createMessage(`Successfully **enabled** automod for this server!`);
			}
		} else if (args[0] === 'disable') {
			if (!guild.automod.enabled) {
				return message.channel.createMessage(`✘ Automoderation is **already enabled** for this server!`);
			} else {
				await guild.updateOne({ 'automod.enabled': false });
				await message.channel.createMessage(`Successfully **disabled** automod for this server!`);
			}
		} else if (args[0] === 'show') {
			const { offline, online } = require('../../emotes.json');
			let o = online;
			let colour = 0x10eb23;
			if (!guild.automod.enabled) {
				o = offline;
				colour = 0xdb1a1a;
			}
			let embed = {
				title: `Automoderation settings for ${message.channel.guild.name}`,
				description: `${o} This module is **${guild.automod.enabled
					? 'enabled'
					: 'disabled'}** for this server.`,
				fields: [
					{
						name: 'Default Words',
						value: 'fuck\ncunt\nretard\ndick\nbitch\ncock',
						inline: true
					},
					{
						name: 'Other',
						value: 'Discord Invite Links\nSpam Caps',
						inline: true
					}
				],
				color: colour
			};
			if (guild.automod.words > 1) {
				embed.fields[2] = { name: 'Custom', value: guild.badwords.join('\n'), inline: true };
			}

			message.channel.createMessage({ embed });
		} else if (args[0] === 'add') {
			if (!args.length) {
				message.channel.createMessage(`✘ Please provide a word or words for me to blacklist.`);
			} else {
				await guild.updateOne({ $addToSet: { 'automod.words': args.slice(1).join(' ') } });
				await message.channel.createMessage(
					`Succesfully added **${args.slice(1).join(' ')}** as a blacklisted word.`
				);
			}
		} else if (args[0] === 'remove') {
			if (!args.length) {
				message.channel.createMessage(
					`✘ Please provide a blacklisted word for me to remove from the blacklisted wordsQ`
				);
			} else {
				await guild.updateOne({ $pull: { 'automod.words': args.slice(1).join(' ') } }).then((e) => {
					message.channel.createMessage(
						`Successfully removed **${args.slice(1).join(' ')}** as a blacklisted word.`
					);
				});
			}
		} else if (args[0] === 'remove-all') {
			await guild.deleteOne({ $addToSet: { 'automod.words': args.slice(1).join(' ') } }).then((e) => {
				message.channel.createMessage(`Successfully removed **all server blacklisted words!**`);
			});
		}
	}
};
// 		const uild = require('../../models/Guild');
// 		let guild = await uild.findOne({ id: message.channel.guild.id });
// 		if (!message.member.permission.has('manageGuild')) {
// 			return message.channel.createMessage(memberNoPerms);
// 		} else {
// 			if (!args.length) {
// 				return message.channel.createMessage(
// 					`Automoderation for **${message.channel.guild.name}** is **${guild.automod
// 						? 'enabled'
// 						: 'disabled'}**`
// 				);
// 			} else if (args[0] === 'enable') {
// 				let guild = await uild.findOne({ id: message.channel.guild.id });
// 				if (guild.automod) {
// 					message.channel.createMessage(`Automoderation is **already enabled** for this server!`);
// 				} else {
// 					await guild.updateOne({ automod: true }).then((e) => {
// 						message.channel.createMessage(`Successfully **enabled** autmoderation for this server.`);
// 					});
// 				}
// 			} else if (args[0] === 'disable') {
// 				let guild = await uild.findOne({ id: message.channel.guild.id });
// 				if (!guild.automod) {
// 					message.channel.createMessage(`Automoderation is **already disabled** for this server!`);
// 				} else {
// 					await guild.updateOne({ automod: false }).then((e) => {
// 						message.channel.createMessage(`Successfully **disabled** automoderation for this server.`);
// 					});
// 				}
// 			} else if (args[0] === 'add') {
// 				if (!args.length) {
// 					message.channel.createMessage(`Please provide a word or words for me to blacklist.`);
// 				} else {
// 					await guild.updateOne({ $addToSet: { badwords: args.slice(1).join(' ') } }).then((e) => {
// 						message.channel.createMessage(
// 							`Succesfully added **${args.slice(1).join(' ')}** as a blacklisted word.`
// 						);
// 					});
// 				}
// 			} else if (args[0] === 'remove') {
// 				if (!args.length) {
// 					message.channel.createMessage(
// 						`Please provide a blacklisted word for me to remove from the blacklisted words`
// 					);
// 				} else {
// 					await guild.updateOne({ $pull: { badwords: args.slice(1).join(' ') } }).then((e) => {
// 						message.channel.createMessage(
// 							`Successfully removed **${args.slice(1).join(' ')}** as a blacklisted word.`
// 						);
// 					});
// 				}
// 			} else if (args[0] === 'show') {
// 				const { offline, online } = require('../../emotes.json');
// 				let o = online;
// 				let colour = 0x10eb23;
// 				if (!guild.automod) {
// 					o = offline;
// 					colour = 0xdb1a1a;
// 				}
// 				let embed = {
// 					title: `Automoderation settings for ${message.channel.guild.name}`,
// 					description: `${o} This module is **${guild.automod ? 'enabled' : 'disabled'}** for this server.`,
// 					fields: [
// 						{
// 							name: 'Default Words',
// 							value: 'fuck\ncunt\nretard\ndick\nbitch\ncock',
// 							inline: true
// 						},
// 						{
// 							name: 'Other',
// 							value: 'Discord Invite Links',
// 							inline: true
// 						}
// 					],
// 					color: colour
// 				};
// 				if (guild.badwords.length > 1) {
// 					embed.fields[2] = { name: 'Custom', value: guild.badwords.join('\n'), inline: true };
// 				}

// 				message.channel.createMessage({ embed });
// 			} else if (args[0] === 'remove-all') {
// 				if (!args.length) {
// 					message.channel.createMessage(
// 						`Please provide a word or words for me to remove from the blacklisted words`
// 					);
// 				} else {
// 					await guild.deleteOne({ $addToSet: { badwords: args.slice(1).join(' ') } }).then((e) => {
// 						message.channel
// 							.createMessage(`Successfully removed **all server blacklisted words.**`)
// 							.catch((e) => {
// 								message.channel.createMessage(`I could not find that blacklisted word!`);
// 							});
// 					});
// 				}
// 			}
// 		}
// 	}
// };
