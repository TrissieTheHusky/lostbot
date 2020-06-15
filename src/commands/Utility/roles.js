module.exports = {
	name: 'roles',
	category: 'Utility',
	description: 'Shows the server roles, if too many roles, Lost will not respond.',
	cooldown: 4,

	execute: (message, client) => {
		let r = message.channel.guild.roles
			.filter((r) => r.id !== message.channel.guild.id)
			.sort((a, b) => b.position - a.position)
			.map((r) => r.mention)
			.join(' ');

		client.createMessage(message.channel.id, {
			embed: {
				title: `Showing roles for ${message.channel.guild.name}. I found ${message.channel.guild.roles
					.size} roles.`,
				thumbnail: { url: message.channel.guild.iconURL },
				fields: [
					{
						name: 'Server Roles',
						value: r
					}
				]
			}
		});
	}
};
