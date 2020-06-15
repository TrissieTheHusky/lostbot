module.exports = {
	name: 'createchannel',
	category: 'Administration',
	description: 'Create a channel',
	aliases: [ 'addchannel', 'newchannel' ],
	example: `createchannel lost-talk voice\ncreatechannel lost-talk text\ncreatechannel lost-talk category\nlost-is-cool text 3`,
	usage: `createchannel <channel name> <type> [slowmode]`,

	execute: (message, client, args) => {
		const { memberNoPerms, lostNoPerms, errorInE } = require('../../rMessages');

		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		}
		if (!message.channel.guild.members.get(client.user.id).permission.has('manageGuild')) {
			message.channel.createMessage(lostNoPerms);
		}
		try {
			let name = args[0];
			let type = args[1];
			let rlpu = args[2];

			if (!name) {
				message.channel.createMessage(`✘ Please provide a name for me to name this channel!`);
			}
			if (!type) {
				message.channel.createMessage(
					'✘ Please provide a type to set this channel, (either: `text`, `voice` or `category`)'
				);
			} else {
				if (type === 'text') type = 0;
				if (type === 'voice') type = 2;
				if (type === 'category') type = 4;
				if (isNaN(rlpu)) rlpu = 0;

				message.channel.guild
					.createChannel(name, type, {
						ratePerLimitUser: rlpu
					})
					.then((e) =>
						message.channel.createMessage(
							`Successfully created a channel with the name of **${name}** . This channel is a **${type}** channel with **${rlpu} seconds**  slowmode.`
						)
					);
			}
		} catch (e) {
			console.log(e);
			message.channel.createMessage(errorInE);
		}
	}
};
