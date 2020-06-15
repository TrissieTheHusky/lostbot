module.exports = {
	name: 'ping',
	description: 'Get the bots latency, or each shard latency',
	category: 'Utility',
	example: 'ping\nping 1',
	cooldown: 2,

	execute: async (message, client, args) => {
		if (!args.length) {
			// const msg = await message.channel.createMessage('🏓 Pong!');
			// msg.edit(`Pong! - \`${msg.createdAt - msg.createdAt}ms\``);
			const msg = await message.channel.createMessage('🏓 Pong!');
			msg.edit(`Pong! - \`${Math.abs(message.createdAt - msg.createdAt)}ms\``);
		} else if (args[0].toLowerCase() === '0') {
			message.channel.createMessage(`**Pong!** Shard 0 - \`${client.shards.get(0).latency}ms\``);
		} else if (args[0].toLowerCase() === '1') {
			message.channel.createMessage(`**Pong!** Shard 1 - \`${client.shards.get(1).latency}ms\``);
		} else if (args[0].toLowerCase() === '2') {
			message.channel.createMessage(`**Pong!** Shard 2 - \`${client.shards.get(2).latency}ms\``);
		} else if (args[0].toLowerCase() === '3') {
			message.channel.createMessage(`**Pong!** Shard 3 - \`${client.shards.get(3).latency}ms\``);
		} else if (
			args[0].toLowerCase() !== '3' ||
			args[0].toLowerCase() !== '2' ||
			args[0].toLowerCase() !== '1' ||
			args[0].toLowerCase() !== '0'
		) {
			const msg = await message.channel.createMessage('🏓 Pong!');
			msg.edit(`**That shard does not exist!** \`${Math.abs(message.createdAt - msg.createdAt)}ms\``);
		}
	}
};
