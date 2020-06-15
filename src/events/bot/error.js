const { offline } = require('../../emotes.json');
module.exports = (client, error, id) => {
	client.createMessage('687774976631373846', {
		embed: {
			title: 'Error',
			description: `${offline} An error occurred with shard ${id}!\n\n${error}`,
			color: 0xdb1a1a
		}
	});
};
