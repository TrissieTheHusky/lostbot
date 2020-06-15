module.exports = {
	name: 'config',
	description: 'get the config smthing idk',
	hidden: true,

	execute: async (message, client, args) => {
		let o = [ '475371795185139712', '599020649222242315' ];
		if (!o.includes(message.author.id)) return;
		if (!args.length) {
			message.channel.createMessage('smh, do whta u need 2 do');
		} else {
			let aa = require('../../models/Guild');
			let guild = await aa.findOne({ id: args[0] });

			//			let jsonified = JSON.stringify(findGuildDB);

			message.channel.createMessage(
				('```json\n' + JSON.stringify(guild) + '```')
					.split('{')
					.join('{\n')
					.split(',')
					.join(',\n')
					.split('}')
					.join('\n}')
			);
		}
	}
};
