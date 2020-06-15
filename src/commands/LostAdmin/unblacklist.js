module.exports = {
	name: 'unblacklist',
	aliases: ['whitelist'],
	description: 'blacklist users- stop looking at this smh',
	hidden: true,

	execute: async (message, client, args) => {
		if (!args.length) {
			message.channel.createMessage('sur, u kno what to do');
		} else {
			let r =
				message.channel.guild.members.find((e) => e.id === args[0]) ||
				message.channel.guild.members.find((e) => e.mention === args[0]);
			const m = require('../../models/Member');
			let member = await m.findOne({ id: r.id });
			if (!member.blacklisted.all) return message.channel.createMessage(`This user is not blacklisted.`);
			await member.updateOne({ 'blacklisted.all': false });

			await message.channel.createMessage(`${r.mention} has been unblacklisted.`);
		}
	}
};
