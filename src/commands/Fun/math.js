const mathjs = require('mathjs');

module.exports = {
	name: 'math',
	category: 'Fun',
	description: 'Math command',
	aliases: [ 'calculate' ],
	example: 'math 1+1\nmath pi\nmath 100 cm to in\nmath 100 fahrenheit to celsius',
	usage: 'math <expression>',

	execute: (message, client, args) => {
		let expression = message.content.split(' ');
		expression.shift();
		expression = expression.join(' ');
		try {
			let result = mathjs.evaluate(expression);

			client.createMessage(message.channel.id, {
				embed: {
					title: 'Calculator',
					timestamp: new Date(),
					footer: { text: `Powered by Math.JS` },
					fields: [
						{
							name: 'Input',
							value: expression,
							inline: true
						},
						{
							name: 'Output',
							value: result.toString(),
							inline: true
						}
					],
					color: 0xfffffa
				}
			});
		} catch (e) {
			client.createMessage(message.channel.id, "✘ I couldn't evaluate the given expressions");
		}
	}
};
