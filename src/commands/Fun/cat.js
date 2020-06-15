const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	description: 'View a picture of a cute cat, or a fact about cats',
	category: 'Fun',
	cooldown: 2,
	example: 'cat\ncat fact',
	execute: async (message, client, args) => {
		async function getCat() {
			const r = await fetch('https://some-random-api.ml/img/cat');
			r.json().then((e) => {
				message.channel.createMessage({
					content: 'Found a cat!',
					embed: {
						title: ':cat: Found one!',
						image: { url: e.link },
						color: message.member.color
					}
				});
			});
		}
		async function getfact() {
			const e = await fetch('https://some-random-api.ml/facts/cat');
			e.json().then((e) => {
				message.channel.createMessage(e.fact);
			});
		}
		if (!args.length) getCat();
		else if (args[0] === 'fact') getfact();
		else getCat();
	}
};
