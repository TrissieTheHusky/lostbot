module.exports = {
	name: 'variables',
	aliases: [ 'vars' ],
	description: 'See the variables for the Modules',
	category: 'Information',

	execute: async (message, client, args) => {
		let r = require('../../models/Guild');
		let guild = await r.findOne({ id: message.channel.guild.id });
		let prefix = guild.prefix;
		let twotime = new Intl.DateTimeFormat('default', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric'
		}).format(new Date());
		message.channel.createMessage({
			// embed: {
			// 	fields: [
			// 		{
			// 			name: '**Custom Commands**',
			// 			value: `#1 - The first argument provided on the commands usage\n#2 - The second argument provided on the commands usage\n#3 - The third argument provided on the commands usage\n#4 - The fourth argument provided on the commands usage\n#5 - The first argument provided on the commands usage\n##+ - All of the arguments provided on the commands usage`
			// 		}
			// 	]
			// },
			embed: {
				author: { name: client.user.username, icon_url: client.user.avatarURL },
				title: 'Variables for Losts Modules',
				description: `__Examples:__\n{member} - ${message.member.mention}\n{memberID} - ${message.member
					.id}\n{serverName} - ${message.channel.guild.name}\n{serverID} - ${message.channel.guild
					.id}\n{username} - ${message.member.username}\n{size} - ${message.channel.guild
					.memberCount}\n{send:702241622926295092}\n{24-time} - ${new Date()
					.toLocaleTimeString()
					.slice(0, 5)}\n{12-time} - ${twotime}`,
				fields: [
					{
						name: '**Join**',
						value:
							'{member} - The mention of the member who joined\n{username} - The username of the member who joined\n{serverName} - The name of the server\n{size} - The current size of the server'
					},
					{
						name: '**Leave**',
						value:
							'{username} - The members username who left\n{serverName} - The name of the server\n{size} - The current size of the server\n'
					},
					{
						name: '**Custom Commands**',
						value:
							'{member} - The mention of the member who used the embed\n{delete} - Delete the command usage\n{username} - The username of the user using the command\n{memberID} - The ID of the member using the command\n{serverName} - The name of the server\n{serverID} - The ID of the server\n{size} - The current size of the server\n{send:channelID} - The ID of the channel to response of the command\n{24-time} - The current time in the 24 hour format\n{12-time} - The current time in the 12 hour format'
					}
				]
			}
		});
	}
};
