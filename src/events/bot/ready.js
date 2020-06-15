const { online } = require('../../emotes');
module.exports = (client) => {
	const now = Date.now();
	const oof = client.shards
		.map((s) => `Shard ${s.id} is running on ${client.guilds.filter((g) => g.shard.id == s.id).length} guilds`)
		.join('\n');
	console.log(oof);
	console.log(Date.now() - now);
	client.editStatus({ name: `a!help | ${client.guilds.size} Servers`, type: 0 });
	client.createMessage('687774976631373846', {
		embed: {
			title: 'Online',
			description: ` ${online} Online running ${client.shards.size} shards\n\n\`\`\`js\n${oof}\n\`\`\``,
			color: 0x10eb23
		}
	});
};
