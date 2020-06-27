module.exports = {
	name: 'ping',
	description: 'Get the bots latency, or each shard latency',
	category: 'Utility',
	example: 'ping\nping 1',
	cooldown: 2,

	execute: async (message, client, args) => {
		const shards = client.shards;
		switch (args[0]) {
			case '0':
				message.channel.createMessage(`🏓 Pong! - \`${shards.get(0).latency}ms\` for Shard 0`);
				break;
			case '1':
				message.channel.createMessage(`🏓 Pong! - \`${shards.get(1).latency}ms\` for Shard 1`);
				break;
			default:
				const msg = await message.channel.createMessage('🏓 Pong!');
				msg.edit(`🏓 Pong! \`${Math.abs(message.createdAt - msg.createdAt)}ms\``);
		}
	}
};
