module.exports = {
	name: 'tag',
	description: 'Create a tag, shows tags or remove tags',
	category: 'Administration',
	cooldown: 4,
	usage: 'tag show\ntag create <name> <response>\ntag remove <name>\ntag <tag-name>',
	example: 'tag show\ntag create how2lost Add Lost!\ntag how2lost\ntag remove roles',

	execute: async (message, client, args) => {
		const { memberNoPerms } = require('../../rMessages');
		const me = require('../../models/Guild');
		const guild = await me.findOne({ 'guild.id': message.channel.guild.id });
		let query = args.join(' ');
		let p = guild.tags.find((e) => query === e.name);
		if (typeof p !== 'undefined') {
			return message.channel.createMessage(`${p.response}`);
		} else {
			message.channel.createMessage(`✘ That tag doesn't exist!`);
		}
		if (!message.member.permission.has('manageGuild')) {
			return message.channel.createMessage(memberNoPerms);
		} else if (!args.length) {
			return message.channel.createMessage(
				`✘ Please provide if you want to create, show or remove tags, or use a tag! `
			);
		} else if (args[0] === 'create') {
			if (!args[1]) {
				return message.channel.createMessage(`✘ Please provide the name the tag!`);
			} else if (!args[2]) {
				return message.channel.createMessage(`✘ Please provide the response for the tag!`);
			} else {
				await guild.updateOne({
					$push: { tags: { name: args[1], response: args.slice(2).join(' ') } }
				});
				await message.channel.createMessage(`Successfully created a tag with the name of \`${args[1]}\`!`);
			}
		} else if (args[0] == 'show') {
			message.channel.createMessage({
				embed: {
					title: `Tags - ${guild.tags.map((e) => e.name).length}`,
					description: `${guild.tags.map((e) => e.name).join(', ')}`,
					color: 0xfffffa,
					author: { name: client.user.username, icon_url: client.user.avatarURL }
				}
			});
		} else if (args[0] === 'remove') {
			if (!args[1]) {
				return message.channel.createMessage(`✘ You need to provide a tag to remove!`);
			} else {
				await guild.updateOne({ $pull: { tags: { name: args[1] } } });
				await message.channel.createMessage(`Successfully removed the \`${args[1]}\` tag.`);
			}
		}
	}
};
