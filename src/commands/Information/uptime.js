module.exports = {
	name: 'uptime',
	aliases: [ 'up' ],
	description: 'Check Losts uptime',

	execute: (message, client) => {
		let tS = (client.uptime / 1000).toFixed(2);
		let days = Math.floor(tS / 86400);
		let hours = Math.floor(tS / 3600);
		tS %= 3600;
		let minutes = Math.floor(tS / 60);
		let seconds = tS % 60;

		seconds.toString().length === 1 ? (seconds = seconds.toString()) : (seconds = seconds.toString());
		minutes.toString().length === 1 ? (minutes = minutes.toString()) : (minutes = minutes.toString());
		hours.toString().length === 1 ? (hours = hours.toString()) : (hours = hours.toString());
		message.channel.createMessage({
			embed: {
				author: { name: client.user.username, icon_url: client.user.avatarURL },
				title: 'Losts Uptime',
				description: `${days} days, ${hours} hours and ${minutes} minutes`
			}
		});
	}
};
