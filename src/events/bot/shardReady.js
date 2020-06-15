const { online } = require('../../emotes.json');
module.exports = (client, id) => {
	client.createMessage('687774976631373846', {
		embed: {
			title: ` Shard Ready`,
			color: 0xfffffa,
			description: `${online} ID: ${id}`
		}
	});
};
