const { online } = require('../../emotes');
module.exports = async (client, guild) => {
	let a = await client.getRESTUser(guild.ownerID);
	let nam = a.username;
	client.createMessage('701851658430316564', {
		embed: {
			color: Number(require('../../config').green),
			title: 'Guild Joined / Became available',
			thumbnail: { url: guild.iconURL },
			description: `__**Description of Guild**__\nName: ${guild.name}\nOwner: ${nam} (${guild.ownerID})\nID: ${guild.id}\nMember Count: ${guild.memberCount}\n`
		}
	});
};
