const Eris = require('eris-additions')(require('eris'));
const cooldowns = new Eris.Collection();
const commandL = new Map();
module.exports = async (client, message) => {
	const memberS = require('../../models/Member');
	const guildS = require('../../models/Guild');
	const { dnd } = require('../../emotes');
	const { memberNoPerms } = require('../../rMessages');
	const dookiewords = [ 'fuck', 'cunt', 'retard', 'dick', 'bitch', 'cock' ];
	let member = await memberS.findOne({ id: message.author.id });
	if (!member) {
		member = new memberS({
			id: message.author.id,
			blacklisted: { all: false, say: { amount: 0, allowed: true } },
			modlogs: []
		});
		await member.save().catch((e) => console.log(e));
	} else {
		await member.updateOne({
			id: member.id,
			modlogs: member.modlogs,
			blacklisted: member.blacklisted
		});
	}
	let guild = await guildS.findOne({ id: message.guildID });
	if (!guild) {
		guild = new guildS({
			id: message.guildID,
			prefix: ';;',
			welcome: { message: null, channel: null, enabled: false },
			leave: { message: null, channel: null, enabled: false },
			logs: { action: { channel: null, enabled: false }, mod: { channel: null, enabled: false } },
			automod: { enabled: false, words: [] },
			tags: [],
			commands: [],
			moderations: {},
			mute: { role: null },
			mod: { roles: [], only: false },
			modules: { enabled: [ 'Fun', 'Utility', 'Moderation', 'Information', 'Administration' ], disabled: [] }
		});
		await guild.save().catch((e) => console.log(e));
	} else {
		await guild.updateOne({
			id: guild.id,
			prefix: guild.prefix,
			welcome: guild.welcome,
			leave: guild.leave,
			logs: guild.logs,
			automod: guild.automod,
			tags: guild.tags,
			commands: guild.commands,
			moderations: guild.moderations,
			mute: guild.mute,
			mod: guild.mod
		});
	}

	const hasBannedWord =
		(dookiewords.some((e) => message.content.toLowerCase().split(' ').includes(e)) &&
			!message.member.permission.has('manageGuild')) ||
		(guild.automod.words.some((e) => message.content.toLowerCase().split(' ').includes(e)) &&
			!message.member.permission.has('manageGuild'));
	if (guild.automod.enabled) {
		if (message.author.bot) return;
		if (message.content.toLowerCase().match(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/)) {
			let a = await message.channel.createMessage(
				`${message.member.mention} Do not send Discord invitation links.`
			);

			message.delete();
			setTimeout(async () => {
				await a.delete();
			}, 5500);
		}
		String.prototype.isUpperCase = function() {
			return this.valueOf().toUpperCase() === this.valueOf();
		};
		if (
			message.content.isUpperCase() &&
			message.content.length > 20 /*&&
			!message.member.permission.has('manageGuild')*/
		) {
			await message.delete();
			let o = await message.channel.createMessage(
				`${message.member.mention}, Do not spam caps, its not allowed.`
			);
			setTimeout(async () => {
				await o.delete();
			}, 5500);
		}
		if (hasBannedWord) {
			message.delete();
			let o = await message.channel.createMessage(
				`${message.member.mention} Do not send that word, its not allowed.`
			);
			setTimeout(async () => {
				await o.delete();
			}, 5500);
		}
	}
	if (member.blacklisted.all) return;
	let prefix = guild.prefix;

	const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content) || message.author.bot) return;
	const [ , mp ] = message.content.match(prefixRegex);
	const args = message.content.slice(mp.length).trim().split(/ +/g);
	if (guild.commands === null) {
		guild.commands = [];
	}

	const a = guild.commands.find((e) => args.join(' ') === e.name);
	if (a !== undefined) {
		const twotime = new Intl.DateTimeFormat('default', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric'
		}).format(new Date());
		const ree = a.response
			.replace('{member}', message.member.mention)
			.replace('{serverName}', message.channel.guild.name)
			.replace('{memberID}', message.member.id)
			.replace('{username}', message.member.username)
			.replace('{size}', message.channel.guild.memberCount)
			.replace('{24-time}', new Date().toLocaleTimeString().slice(0, 5))
			.replace('{12-time}', twotime)
			.replace('{delete}', '')
			.replace('#1', args[2])
			.replace('#2', args[3])
			.replace('#3', args[4])
			.replace('#4', args[5])
			.replace('#5', args[6])
			.replace('##+', args.slice(2).join(' '));
		//             const ele = a.response.split('').find((e) => e.startsWith('{channel:'));
		// ele.split(':')[1].split('}')[0];
		const resinc = a.response.split(' ');
		if (a.response.includes('{delete}') && a.response.length > 8) await message.delete();
		let channel = message.channel.id;
		if (resinc.find((e) => e.startsWith('{send:'))) {
			const cid = resinc.find((e) => e.startsWith('{send:')).split(':')[1].split('}')[0];
			channel = cid;
			a.response.replace(`{send:${cid}}`, '');
		}

		if (message.content.startsWith(`${prefix}${a.name}`)) {
			const e = await client.createMessage(channel, `${ree}`);
			if (resinc.find((e) => e.startsWith('{edit:'))) {
				const time = resinc.find((e) => e.startsWith('{edit:')).split(':')[1].split(':')[0];
				const words = resinc.find((e) => e.startsWith('{edit:')).split(':')[2].split(':')[0].split('}')[0];
				a.response.replace(`{edit:${time}:${words}}`, '');

				if (isNaN(time)) return;
				setTimeout(() => {
					e.edit(words);
				}, time);
			}
			e;
		}
	}
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel
				.createMessage(
					`${message.member.mention}, you're being rate limited! Please wait **${timeLeft.toFixed(
						2
					)}** seconds before trying to use this command.`
				)
				.then((e) => setTimeout(async () => await e.delete(), cooldownAmount));
			// setTimeout(async () => {
			// 	await r.delete();
			// }, cooldownAmount);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	timestamps.set(message.author.id, now);
	if (!commandL.has(message.author.id)) commandL.set(message.author.id, [ Date.now() ]);
	else {
		const filteredTimestamps = commandL.get(message.author.id).filter((e) => e > Date.now() - 5_000);
		if (filteredTimestamps.length >= 3) await member.updateOne({ 'blacklisted.all': true });
		filteredTimestamps.push(Date.now());
		commandL.set(message.author.id, filteredTimestamps);
	}

	try {
		if (guild.mod.only || message.member.permission.has('manageGuild')) {
			if (guild.mod.roles.some((e) => message.member.roles.includes(e))) {
				command.execute(message, client, args);
			}
		} else command.execute(message, client, args);
	} catch (e) {
		console.log(e);
		message.channel.createMessage(
			`${dnd} An error occurred when trying to use this command, please try again, if this issue persists, please contact Lost Support:tm:`
		);
	}
};
