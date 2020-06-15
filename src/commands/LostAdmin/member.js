module.exports = {
	name: 'm',
	hidden: true,

	execute: async (message, client, args) => {
		let o = [ '475371795185139712', '599020649222242315', '556938379875319844', '533069055784124437' ];
		if (!o.includes(message.author.id)) return;

		const m = require('../../models/Member');
		const e =
			message.channel.guild.members.find((e) => e.mention === args[0]) ||
			message.channel.guild.members.find((e) => e.username === args[0]) ||
			message.channel.guild.members.find((e) => e.id === args[0]) ||
			message.member;

		const member = await m.findOne({ id: e.id });
		message.channel.createMessage(`\`\`\`js\n${member}\n\`\`\``);
	}
};
