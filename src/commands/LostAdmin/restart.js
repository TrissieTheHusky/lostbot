module.exports = {
	name: 'r',
	hidden: true,

	execute: async (message, client) => {
		const child_process = require('child_process');
		let o = [ '475371795185139712', '599020649222242315' ];
		if (!o.includes(message.author.id)) return;
		await message.channel.createMessage(`restarting`);
		child_process.exec('pm2 restart bot.js', (stdout, stderr) => null);
		await message.channel.createMessage('restarted');
	}
};
