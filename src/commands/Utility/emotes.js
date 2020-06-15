module.exports = {
	name: 'emotes',
	aliases: [ 'emojis' ],
	description: 'Shows the server emotes, if too many emotes, Lost will not respond.',
	cooldown: 4,

	execute: (message, client) => {
		let e = message.channel.guild.emojis.map((e) => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`).join(' ');

		client.createMessage(message.channel.id, {
			embed: {
				title: `Showing emotes for ${message.channel.guild.name}. I found ${message.channel.guild.emojis
					.length} emotes.`,
				color: 0xfffffa,
				fields: [
					{
						name: 'Server emotes',
						value: e
					}
				],
				thumbnail: { url: message.channel.guild.iconURL }
			}
		});
	}
};
