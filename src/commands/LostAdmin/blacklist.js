module.exports = {
	name: 'blacklist',
	description: 'blacklist users- stop looking at this smh',
	hidden: true,

	execute: async (message, client, args) => {
		if (!args.length) {
			message.channel.createMessage('sur, u kno what to do');
		} else {
			let r =
				message.channel.guild.members.find((e) => e.id === args.join(' ')) ||
				message.channel.guild.members.find((e) => e.mention === args.join(' ')) ||
				message.channel.guild.members.find((e) => e.nick === args.join(' '));
			const m = require('../../models/Member');

			let member = await m.findOne({ id: r.id });
			if (member.blacklisted.all) return message.channel.createMessage(`This user is already blacklisted.`);
			await member.updateOne({ 'blacklisted.all': true });
			await message.channel.createMessage(`${r.mention} has been blacklited.`);
		}
	}
};
