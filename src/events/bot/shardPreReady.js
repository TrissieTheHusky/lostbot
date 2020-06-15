const { idle } = require('../../emotes.json');

module.exports = (client, id) => {
	client.createMessage('687774976631373846', {
		embed: {
			title: `Shard Pre-ready`,
			description: `${idle} ID: ${id}`,
			color: 0xebd910
		}
	});
};
