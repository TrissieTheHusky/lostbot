module.exports = {
	name: 'responder',

	execute: async (message, client, args) => {
		const g = require('../../models/Guild');
		const eris = require('eris-additions')('eris');
		const guild = await g.findOne({ id: message.channel.guild.id });
		const { memberNoPerms, errorInE } = require('../../rMessages');
		if (guild.mod.roles.some((e) => message.member.roles.includes(e))) {
			return message.channel.createMessage(memberNoPerms);
		} //else if (!args.length) return message.channel.createMessage('e');
		//else {
		let response = await message.channel.awaitMessages((msg) => msg.content === 'yes', {
			time: 10000,
			maxMatches: 1
		});
		// respones = message.channel.awaitMessages((m) => true, { time: 10000, maxMatches: 1 });
		// respones.on('message', (message) => {
		// 	console.log(message);
		// });
		console.log(response);
		message.channel.createMessage(response[0]); //	}
	}
};
