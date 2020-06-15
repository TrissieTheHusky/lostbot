const ms = require('ms');
const moment = require('moment');

module.exports = {
	name: 'mute',
	description: 'Mute members in the guild with an optional time',
	category: 'Moderation',
	cooldown: 3,
	usage: 'mute <member> [time] [reason]\nmute role <role>',
	example: 'mute @OfficiallyLost 10m being rood!\nmute @OfficiallyLost smH! Permanent!\nmute role Muted',

	execute: async (message, client, args) => {
		const {
			memberNoPerms,
			errorInE,
			provideMemberTo,
			moderationActOnMod,
			cantFindMember
		} = require('../../rMessages');
		const guil = require('../../models/Guild');
		const Guild = await guil.findOne({ id: message.channel.guild.id });

		if (!message.member.permission.has('manageMessages')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(`${provideMemberTo} mute!`);
		} else {
			let member =
				message.channel.guild.members.find((e) => e.id === args[0]) ||
				message.channel.guild.members.find((e) => e.mention === args[0]) ||
				message.channel.guild.members.find((e) => `${e.username}#${e.discrimininator}` === args[0]) ||
				message.channel.guild.members.find((e) => `${e.username}${e.discrimininator}` === args[0]) ||
				message.channel.guild.members.find((e) => e.username === args[0]);
			if (!member || member === undefined) {
				return message.channel.createMessage(cantFindMember);
			} else if (member.length > 1) {
				return message.channel.createMessage(`✘ I found more than one users matching the member provided!`);
			} else if (member.id === message.author.id) {
				return message.channel.createMessage(moderationActOnMod);
			} else if (member.id === client.user.id) {
				return message.channel.createMessage(moderationActOnMod);
			} else if (message.channel.guild.members.get(member.id).permission.has('manageNicknames')) {
				return message.channel.createMessage(moderationActOnMod);
			} else if (message.channel.guild.members.get(member.id).permission.has('manageMessages')) {
				return message.channel.createMessage(moderationActOnMod);
			} else {
				let gu = require('../../models/Guild');
				let guild = await gu.findOne({ id: message.channel.guild.id });
				let role = guild.mute.role;

				if (!role || role === null) {
					return message.channel.createMessage(`✘ The muted role has not been set up!`);
				} else if (member.roles.includes(role)) {
					return message.channel.createMessage(`✘ This user is already muted!`);
				} else {
					let reason = 'No reason provided.';
					await member.addRole(role, reason).catch(async (e) => {
						console.log(e);
						await message.channel.createMessage(`✘ I d`);
					});

					let yeet;
					let dm = await client.getDMChannel(member.id);
					let odm = dm.id;
					let momentMilliseconds;
					let time;
					try {
						let farg;
						let o;
						if (args[1] && args[1].match(/^\d/)) {
							farg = args[1];
							o = farg.match(/^\d/);
						}
						if (o) {
							const lockLength = args[1].match(/[a-z]+|[^a-z]+/gi);
							const length = Number(lockLength[0]);
							const unit = lockLength[1];
							momentMilliseconds = moment.duration(length, unit).asMilliseconds();

							reason = momentMilliseconds ? args.slice(2).join(' ') : args.slice(1).join(' ');
							setTimeout(async () => {
								await member.removeRole(role, 'Mute was temporary').catch((e) => {
									console.log(e);
									message.channel.createMessage(
										`✘ I do not have permission to add a role to that user!`
									);
								});
							}, momentMilliseconds);

							time = momentMilliseconds;
							let s = require('pretty-ms');
							await message.channel.createMessage(
								`Successfully muted **${member.username}** with a duration of **${s(
									time
								)}** for ${reason}.`
							);
						} else {
							let lastCase;
							await guild.updateOne({
								$push: {
									moderations: {
										mute: {
											users: member.id,
											mod: message.author.id,
											time: time,
											reason: reason
										}
									}
								}
							});
							let mem = require('../../models/Member');
							let member = await mem.findOne({ 'member.id': member.id });
							await member.updateOne({
								$push: {
									modlogs: {
										mute: {
											mod: message.author.id,
											reason: reaon,
											time: momentMilliseconds
										}
									}
								}
							});
							await guild.updateOne({
								$push: {
									moderations: {
										mute: {
											user: member.id,
											mod: message.author.id,
											time: momentMilliseconds,
											case: 1,
											reason: reason
										}
									}
								}
							});
							await message.channel.createMessage(`Successfully muted **${member.username}.**`);
						}
					} catch (e) {
						console.log(e);
						message.channel.createMessage(errorInE);
					}
				}
				let farg;
				let o;
				let lockLength;
				let momentMilliSeconds;

				if (args[1] && args[1].match(/^\d/)) {
					farg = args[1];
					o = farg.match(/[a-z]+|[^a-z]+/gi);
					lockLength = farg.match(/[a-z]+|[^a-z]+/gi);
				}
				const channel = guild.logs.mod.channel;
				if (!channel || !guild.logs.mod.enabled) return;

				// length = Number(lockLength[0]);
				// unit = o[0];
				// momentMilliseconds = moment.duration(length, unit).asMilliseconds();
				// time = momentMilliseconds;
				// ntime = time;

				// if (time) {
				// 	time.match(/^\d/);
				// }
				let momentMilliseconds;
				if (args.length > 2) {
					const lockLength = args[1].match(/[a-z]+|[^a-z]+/gi);
					const length = Number(lockLength[0]);
					const unit = lockLength[1];
					momentMilliseconds = moment.duration(length, unit).asMilliseconds();
				}

				reason = momentMilliseconds ? args.slice(2).join(' ') : args.slice(1).join(' ');
				let dur = momentMilliseconds;
				if (reason.match(/^\d/)) {
				}
				if (!reason) {
					reason = 'No reason provided.';
				}
				await member.addRole(role, reason).catch(async (e) => {
					console.log(e);
					await message.channel.createMessage(`✘ I do not have permission to add a role to that user!`);
				});
				let yur, y;
				if (!dur) {
					dur =
						9999999999999999999999999 *
						client.uptime *
						message.createdAt *
						client.user.createdAt *
						message.author.createdAt;
					y = 'Permanent';
				} else y = ms(dur);
				client.createMessage(channel, {
					embed: {
						title: 'Member Muted',
						description: `A member was muted by ${message.member.mention}.\n**Duration:** ${y}`,
						author: { name: ` |  ${message.channel.guild.name}`, icon_url: member.avatarURL },
						footer: { text: `User ID: ${member.id}` },
						color: Number(require('../../config').colours.green),
						timestamp: new Date(),
						fields: [
							{
								name: 'Member',
								value: member.mention,
								inline: true
							},
							{
								name: 'Reason',
								value: reason,
								inline: true
							}
						]
					}
				});
			}

			if (args[1] && args[1].match(/^\d/)) {
				const lockLength = args[1].match(/[a-z]+|[^a-z]+/gi);
				const length = Number(lockLength[0]);
				const unit = lockLength[1];
				momentMilliseconds = moment.duration(length, unit).asMilliseconds();

				reason = momentMilliseconds ? args.slice(2).join(' ') : args.slice(1).join(' ');

				const g = require('../../models/Guild');
				const guild = await g.findOne({ id: message.channel.guild.id });
				const channel = guild.logs.mod.channel;
				if (channel && guild.logs.mod.enabled) {
					setTimeout(async () => {
						let time = moment.duration(length, unit).asMilliseconds();

						client.createMessage(channel, {
							embed: {
								title: 'Member Unmuted',
								description: `A member was unmuted.`,
								timestamp: new Date(),
								author: {
									name: ` |  ${message.channel.guild.name}`,
									icon_url: member.avatarURL
								},
								footer: { text: `User ID: ${member.id}` },
								color: Number(require('../../config').colours.yellow),
								fields: [
									{
										name: 'Member',
										value: member.mention,
										inline: true
									},
									{
										name: 'Reason',
										value: 'Mute was temporary',
										inline: true
									}
								]
							}
						});
					}, moment.duration(length, unit).asMilliseconds());
				} else {
					// setTimeout(async () => {
					// 	await member.removeRole(guild.mute.role, 'Mute was temporary.').catch(async (e) => {
					// 		console.log(e);
					// 		await message.channel.createMessage(
					// 			`✘ I do not have permission to remove a role to that user!`
					// 		);
					// 	});
					// 	momentMilliseconds = moment.duration(length, unit).asMilliseconds();
					// 	client.createMessage(channel, {
					// 		embed: {
					// 			title: 'Member Unmuted',
					// 			description: `A member was unmuted.`,
					// 			timestamp: new Date(),
					// 			author: {
					// 				name: ` |  ${message.channel.guild.name}`,
					// 				icon_url: member.avatarURL
					// 			},
					// 			footer: { text: `User ID: ${member.id}` },
					// 			color: Number(require('../../config').colours.yellow),
					// 			fields: [
					// 				{
					// 					name: 'Member',
					// 					value: member.mention,
					// 					inline: true
					// 				},
					// 				{
					// 					name: 'Reason',
					// 					value: 'Mute was temporary.',
					// 					inline: true
					// 				}
					// 			]
					// 		}
					// 	});
					// }, momentMilliseconds);
				}
			}
		}
	}
};

// module.exports = {
// 	name: 'mute',
// 	description: 'Mute users in the guild',
// 	category: 'Moderation',
// 	cooldown: 3,

// 	execute: async (message, client, args) => {
// 		const {
// 			memberNoPerms,
// 			errorInE,
// 			provideMemberTo,
// 			moderationActOnMod,
// 			cantFindMember
// 		} = require('../../rMessages');
// 		const guil = require('../../models/Guild');
// 		const Guild = await guil.findOne({ 'guild.id': message.channel.guild.id });

// 		if (!message.member.permission.has('manageMessages')) {
// 			return message.channel.createMessage(memberNoPerms);
// 		} else if (!args.length) {
// 			return message.channel.createMessage(`${provideMemberTo} mute!`);
// 		} else {
// 			let member =
// 				message.channel.guild.members.find((e) => e.id === args[0]) ||
// 				message.channel.guild.members.find((e) => e.mention === args[0]) ||
// 				message.channel.guild.members.find((e) => `${e.username}#${e.discrimininator}` === args[0]) ||
// 				message.channel.guild.members.find((e) => `${e.username}${e.discrimininator}` === args[0]) ||
// 				message.channel.guild.members.find((e) => e.username === args[0]);
// 			if (!member || member === undefined) {
// 				return message.channel.createMessage(cantFindMember);
// 			} else if (member.size > 1) {
// 				return message.channel.createMessage(`✘ I found more than one users matching the member provided!`);
// 			} else if (member.id === message.author.id) {
// 				return message.channel.createMessage(moderationActOnMod);
// 			} else if (member.id === client.user.id) {
// 				return message.channel.createMessage(moderationActOnMod);
// 			} else if (message.channel.guild.members.get(member.id).permission.has('manageNicknames')) {
// 				return message.channel.createMessage(moderationActOnMod);
// 			} else if (message.channel.guild.members.get(member.id).permission.has('manageMessages')) {
// 				return message.channel.createMessage(moderationActOnMod);
// 			} else {
// 				let gu = require('../../models/Guild');
// 				let guild = await gu.findOne({ 'guild.id': message.channel.guild.id });
// 				let role = guild.mute.role;

// 				if (!role || role === null) {
// 					return message.channel.createMessage(`✘ The muted role has not been set up!`);
// 				} else if (member.roles.includes(role)) {
// 					return message.channel.createMessage(`✘ This user is already muted!`);
// 				} else {
// 					try {
// 						let fuck;
// 						let yeet;
// 						let dm = await client.getDMChannel(member.id);
// 						let odm = dm.id;
// 						let reason = 'No reason provided.';
// 						let momentMilliseconds;
// 						let channel = guild.logs.mod.channel;
// 						if (!channel || !guild.logs.mod.enabled) return;
// 						if (args.length > 1) {
// 							const lockLength = args[1].match(/[a-z]+|[^a-z]+/gi);
// 							const length = Number(lockLength[0]);
// 							const unit = lockLength[1];
// 							momentMilliseconds = moment.duration(length, unit).asMilliseconds();

// 							reason = momentMilliseconds ? args.slice(2).join(' ') : args.slice(1).join(' ');
// 							if (reason.length > 512)
// 								return message.channel.createMessage(`✘ The provided reason is too long!`);

// 							setTimeout(function() {
// 								member.removeRole(role, 'Mute was temporary');
// 								client.createMessage(channel, {
// 									embed: {
// 										title: 'Member Unmuted',
// 										description: `A member was unmuted.`,
// 										timestamp: new Date(),
// 										author: {
// 											name: ` |  ${message.channel.guild.name}`,
// 											icon_url: member.avatarURL
// 										},
// 										footer: { text: `User ID: ${member.id}` },
// 										color: Number(require('../../config').colours.yellow),
// 										fields: [
// 											{
// 												name: 'Member',
// 												value: member.mention,
// 												inline: true
// 											},
// 											{
// 												name: 'Reason',
// 												value: 'Mute was temporary',
// 												inline: true
// 											}
// 										]
// 									}
// 								});
// 							}, momentMilliseconds);
// 						}
// 						if (reason.includes('No reason provided.')) {
// 							fuck = `Successfully muted **${member.username}**.`;
// 							yeet = `You have been muted in **${message.channel.guild.name}**.`;
// 						} else {
// 							fuck = `Successfully muted **${member.username}** with the duration of **${ms(
// 								momentMilliseconds
// 							)}** for ${reason}.`;
// 							yeet = `You have been muted in **${message.channel.guild.name}** for ${reason}.`;
// 						}
// 						await message.channel.createMessage(fuck);
// 						let hi = ms(momentMilliseconds);
// 						if (!hi) hi = 'p';
// 						await member.addRole(role, reason).catch((e) => {
// 							console.log(e);
// 							message.channel.createMessage(errorInE);
// 						});
// 						client.createMessage(odm, yeet);
// 						//	if (hi === undefined || isNaN(hi) || hi === '') hi = 'Permanent';

// 						client.createMessage(channel, {
// 							embed: {
// 								title: 'Member Muted',
// 								description: `A member was muted by ${message.member.mention}.\n**Duration:** ${hi}`,
// 								author: { name: ` |  ${message.channel.guild.name}`, icon_url: member.avatarURL },
// 								footer: { text: `User ID: ${member.id}` },
// 								color: Number(require('../../config').colours.green),
// 								timestamp: new Date(),
// 								fields: [
// 									{
// 										name: 'Member',
// 										value: member.mention,
// 										inline: true
// 									},
// 									{
// 										name: 'Reason',
// 										value: reason,
// 										inline: true
// 									}
// 								]
// 							}
// 						});
// guild
// 	.updateOne({
// 		$push: {
// 			'mute.users': {
// 				'user.id': member.id,
// 				'user.reason': reason,
// 				'user.mod': message.author.id,
// 				'user.time': hi,
// 				'user.case': 1
// 			}
// 		}
// 	})
// 							// .catch((e) => console.log(e));
// 					} catch (e) {
// 						console.log(e);
// 						message.channel.createMessage(errorInE);
// 					}
// 				}
// 			}
// 		}
// 	}
// };
