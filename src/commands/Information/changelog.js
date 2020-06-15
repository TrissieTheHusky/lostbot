module.exports = {
	name: 'changelog',
	aliases: [ 'updates' ],
	description: 'Get the latest news for Lost',
	category: 'Information',
	cooldown: 5,

	execute: (message, client) => {
		const { discInvite, lostInvite } = require('..//..//links.json');
		let channel = client.getChannel('653796096480509963');
		channel.getMessage(channel.lastMessageID).then((e) =>
			message.channel.createMessage({
				embed: {
					title: `Losts News - Get the latest news for Lost`,
					description: e.content,
					color: 0xfffffa,
					fields: [
						{
							name: 'Discord Invite',
							value: `[Click Here](${discInvite})`,
							inline: true
						},
						{
							name: 'Invite Me!',
							value: `[Click Here](${lostInvite})`,
							inline: true
						}
					]
				}
			})
		);
	}
};
