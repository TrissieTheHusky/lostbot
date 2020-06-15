module.exports = {
	name: 'e-say',
	description: 'Say a message and have Lost repeat it in an embed',
	usage: 'say <text>\nsay [click here](url)',
	category: 'Utility',
	cooldown: 3,

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
							message.channel.createMessage({
								embed: {
									description: msg,
									color: 0xfffffa
								}
							});
						}
					} catch (e) {
						console.log(e);
						message.channel.createMessage(errorInE);
					}
				}
			}
		}
	}
};
