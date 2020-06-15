module.exports = {
	name: 'rl',
	hidden: true,
	execute: async (message, client, args) => {
		delete require.cache[require.resolve(`${args[0]}.js`)];

		try {
			const newCommand = require(`${args[0]}.js`);
			client.commands.set(newCommand.name, newCommand);
			message.channel.createMessage(`Reloaded the ${newCommand.name} command.`);
		} catch (e) {
			console.log(e);
			message.channel.createMessage(`\`\`\`js\n${error}\`\`\``);
		}
	}
};
