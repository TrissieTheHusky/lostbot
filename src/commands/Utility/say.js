module.exports = {
	name: 'say',
	description: 'Say a message and have Lost repeat it',
	usage: 'say <text>\n',
	example: 'say Hello there! Lost speaking!',
	category: 'Utility',
	cooldwon: 2,

	execute: async (message, client, args) => {
		const m = require('../../models/Member');
		const member = await m.findOne({ id: message.member.id });
		const { memberNoPerms, errorInE } = require('../../rMessages');
		if (!member.blacklisted.say.allowed)
			return message.channel.createMessage(
				`✘ You have been blacklisted from using this command.\nFor more information and to appeal, please contact the bot administrators (<${require('../../links')
					.discInvite}>).`
			);
		else {
			const g = require('../../models/Guild');
			const guild = await g.findOne({ id: message.channel.guild.id });
			if (guild.mod.roles.some((e) => message.member.roles.includes(e)))
				return message.channel.createMessage(memberNoPerms);
			else {
				const msg = args.join(' ');
				if (!msg) return message.channel.createMessage(`✘ Please provide something for me to repeat!`);
				else {
					try {
						const { words } = require('../../config');
						const dookiewords = words;
						if (dookiewords.some((e) => args.join(' ').toLowerCase().split(' ').includes(e))) {
							await member.updateOne({ 'blacklisted.say.amount': member.blacklisted.say.amount + 1 });
						}
						if (member.blacklisted.say.amount >= 3) {
							await member.updateOne({
								'blacklisted.say.allowed': false
							});
						} else {
							await message.delete();
							message.channel.createMessage(msg);
						}
					} catch (e) {
						console.log(e);
						message.channel.createMessage(errorInE);
					}
				}
			}
		}
	}
	// 	if (!message.member.permission.has('manageMessages')) {
	// 		client.createMessage(message.channel.id, '✘ You do not have permission to use this command.');
	// 	}
	// 	const toSay = args.join(' ');
	// 	if (!args.length) {
	// 		client.createMessage(message.channel.id, '✘ Please provide something for me to repeat.');
	// 	}

	// 	try {
	// 		client.createMessage(message.channel.id, toSay);
	// 		console.log(`${message.content} : Message was sent from ${message.author.username}.`);
	// 		client.createMessage(
	// 			'687774976631373846',
	// 			`\`\`\`${message.content}\`\`\`\nBy: ${message.author.username} in ${message.channel.guild.name}`
	// 		);
	// 		message.delete();
	// 	} catch (e) {
	// 		client.createMessage(message.channel.id, '✘ An error occured in the process.  ' + e);
	// 		console.log(e);
	// 	}
	// }
};
