const { idle } = require('../../emotes');
module.exports = (client, id) => {
	client.createMessage('687774976631373846', {
		embed: {
			title: 'Shard Resumed',
			description: `${idle} ID: ${id}`,
			color: 0xebd910
		}
	});
};
