const eris = require('eris-additions')(require('eris'));

module.exports = {
	name: 'e',
	aliases: ['eval'],
	category: 'Lost Admin',
	usage: 'e <javascript code>',
	description: 'evaluates JavaScript code',
	hidden: true,

	execute: async (message, client, args) => {
		let o = [
			'475371795185139712',
			'599020649222242315',
			'556938379875319844',
			'533069055784124437',
			'382368885267234816'
		];
		if (!o.includes(message.author.id)) return;
		try {
			const oasdasdasda = require('../../models/Member');
			const member = await oasdasdasda.findOne({
				id: args[1]
			});
			const aadadasdad = require('../../models/Guild');
	
			const guild = await aadadasdad.findOne({
				id: message.channel.guild.id
			});
			if (args.join(' ').includes(`client['t`) || args.join(' ').includes('token') || args.join(' ').includes('tok')) return;
			const ce = args.join(' ');
			let ev = await eval(ce);
			if (typeof ev !== 'string') {
				ev = require('util').inspect(ev);
			}
			await message.channel.createMessage(`\`\`\`js\n${ev}\n\`\`\``);
		} catch (e) {
			await message.channel.createMessage(`\`\`\`js\n${e.stack.slice(0, 300)}\n\`\`\``);
		}
	}
};