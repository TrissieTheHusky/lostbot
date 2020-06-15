const { offline } = require('../../emotes');
module.exports = (client, error, id) => {
	client.createMessage('687774976631373846', {
		embed: {
			title: 'Shard Disconnected',
			description: `${offline} ID: ${id}\n\n**${error}**`,
			color: 0xdb1a1a
		}
	});
};
