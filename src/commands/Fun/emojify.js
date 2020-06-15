const emoji = require('discord-emoji-convert');

module.exports = {
	name: 'emojify',
	category: 'Fun',
	aliases: [ 'emotify' ],
	usage: 'emojify <text>',
	example: 'emojify lost is awesome!',
	ID: 2,

	execute: async (message, client, args) => {
		let toEmote = args.join(' ');

		if (!toEmote) {
			client.createMessage(message.channel.id, '✘ Please provide something for me to repeat in emojis');
		}
		client.createMessage(message.channel.id, emoji.convert(toEmote));
	}
};
