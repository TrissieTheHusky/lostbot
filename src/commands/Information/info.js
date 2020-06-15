const prettyBytes = require('pretty-bytes');

module.exports = {
	name: 'info',
	category: 'Information',
	description: 'View Losts information',

	execute: (message, client) => {
		let guilds = client.guilds.size.toLocaleString('en');
		let users = client.users.size.toLocaleString('en');
		let vers = '1.0.0';
		let support = `(https://discord.gg/FWTRPS9)`;
		let erisPackage = require('..//..//../node_modules/eris/package');
		let lib = `Eris (${erisPackage.version})`;
		let inv = `(https://discordapp.com/oauth2/authorize?client_id=650136984211292180&scope=bot&permissions=2146958847)`;
		let dbl = '(https://top.gg/bot/650136984211292180/vote)';
		let os = require('os');
		let space = prettyBytes(process.memoryUsage().rss);
		let aa = require('../../../node_modules/mongoose/package').version;
		client.createMessage(message.channel.id, {
			embed: {
				title: 'Statistics for Lost',
				thumbnail: { url: client.user.avatarURL },
				color: 0xfffffa,
				description:
					'Lost is a Discord bot with many features which you may need for your server. Keeping it secure at all times, Lost is always there. There are more to come, add Lost and join the Lost Journey!',
				fields: [
					{
						name: 'Links',
						value: `[Support]${support}\n[Invite]${inv}\n[Vote]${dbl}`,
						inline: true
					},
					{
						name: 'Version',
						value: vers,
						inline: true
					},
					{
						name: 'Library',
						value: lib,
						inline: true
					},
					{
						name: 'MongoDB Library',
						value: `Mongoose (${aa})`,
						inline: true
					},
					{
						name: 'Guilds',
						value: guilds,
						inline: true
					},
					{
						name: 'Users',
						value: users,
						inline: true
					}
				]
			}
		});
	}
};
