const fetch = require('node-fetch');
module.exports = {
	name: 'panda',
	description: 'View an image of a panda or a panda fact',
	category: 'Fun',
    cooldown: 2,
    example: 'panda\npanda fact',

	execute: async (message, _, args) => {
		async function getCat() {
			const r = await fetch('https://some-random-api.ml/img/panda');
			r.json().then((e) => {
				message.channel.createMessage({
					content: 'Found a panda!',
					embed: {
						title: ':panda_face: Found one!',
						image: { url: e.link },
						color: message.member.color
					}
				});
			});
		}
		async function getfact() {
			// fetch('https://some-random-api.ml/facts/panda').then((e) => e.json)
			const e = await fetch('https://some-random-api.ml/facts/panda');
			e.json().then((e) => {
				message.channel.createMessage(e.fact);
			});
		}
		if (!args.length) getCat();
		else if (args[0] === 'fact') getfact();
		else getCat();
	}
};
