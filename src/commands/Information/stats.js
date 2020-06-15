const os = require('os');
const prettyByes = require('pretty-bytes');
module.exports = {
	name: 'stats',
	category: 'Information',
	description: 'Get the technical statistics of Lost',

	execute: (message, client) => {
		this.platform = {
			arch: os.arch() ? os.arch() : '32x',
			cpus: os.cpus(),
			release: os.release() ? os.release() : '?.?.?',
			platform: os.platform()
		};

		switch (this.platform.platform) {
			case 'aix':
				this.platform.platform = 'Linux';
				break;
			case 'sunos':
				this.platform.platform = 'Linux';
				break;
			case 'win32':
				this.platform.platform = 'Windows';
				break;
			case 'linux':
				this.platform.platform = 'Linux';
				break;
			case 'darwin':
				this.platform.platform = 'Mac';
				break;
			case 'freebsd':
				this.platform.platform = 'Linux';
				break;
			case 'openbsd':
				this.platform.platform = 'Linux';
				break;
			case 'android':
				this.platform.platform = 'Android';
				break;
			default:
				this.platform.platform = 'Unknown';
		}

		let r = process.platform;
		{
			if (r === 'win32') r = 'Windows';
			if (r === 'linux') r = 'Linux';
			if (r === 'android') r = 'Android';
			if (r === 'darwin') r = 'Mac';
			if (r === 'freebsd') r = 'Linux';
			if (r === 'aix') r = 'Linux';
			if (r === 'sunos') r = 'Linux';
			if (r === 'openbsd') r = 'Linux';
		}

		let memoryU = prettyByes(process.memoryUsage().heapUsed) + ' / ' + prettyByes(os.totalmem());
		let avU = os.loadavg().map((v) => v.toFixed(2)).join(' / ');
		let nV = process.version;
		client.createMessage(message.channel.id, {
			embed: {
				title: 'Losts stats',
				fields: [
					{
						name: 'Operating System',
						value: r,
						inline: true
					},
					{
						name: 'Load Average',
						value: avU,
						inline: true
					},
					{
						name: 'NodeJS Version',
						value: nV,
						inline: true
					},
					{
						name: 'Memory Usage',
						value: memoryU,
						inline: true
					},
					{
						name: 'Process ID',
						value: process.pid,
						inline: true
					},
					{
						name: 'Shard Count',
						value: client.shards.size,
						inline: true
					}
				]
			}
		});
	}
};
