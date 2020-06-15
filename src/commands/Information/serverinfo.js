const { crown, online, offline, idle, dnd } = require('..//..//emotes.json');

module.exports = {
	name: 'serverinfo',
	description: 'get information about the server',
	category: 'Information',
	aliases: [ 'sinfo', 'guildinfo' ],

	execute: (message, client) => {
		let ja = new Date(message.channel.guild.joinedAt).toDateString();
		let cr = new Date(message.channel.guild.createdAt).toDateString();
		let region = message.channel.guild.region;
		if (region === 'europe') {
			region = 'Europe';
		}
		if (region === 'brazil') {
			region = 'Brazil';
		}
		if (region === 'hongkong') {
			region = 'Hong Kong';
		}
		if (region === 'india') {
			region = 'India';
		}
		if (region === 'japan') {
			region = 'Japan';
		}
		if (region === 'singapore') {
			region = 'Singapore';
		}
		if (region === 'russia') {
			region = 'Russia';
		}
		if (region === 'southafrica') {
			region = 'South Africa';
		}
		if (region === 'sydney') {
			region = 'Australia';
		}
		if (region === 'us-central') {
			region = 'Central USA';
		}
		if (region === 'us-east') {
			region = 'Eastern USA';
		}
		if (region === 'us-south') {
			region = 'Southern USA';
		}
		if (region === 'us-west') {
			region = 'Western USA';
		}

		let verification = message.channel.guild.verificationLevel;

		if (verification === 0) {
			verification = 'None';
		}
		if (verification === 1) {
			verification = 'Low';
		}
		if (verification === 2) {
			verification = 'Medium';
		}
		if (verification === 3) {
			verification = 'High';
		}
		if (verification === 4) {
			verification = 'Extreme';
		}
		if (verification === 5) {
			verification = 'Very Extreme.';
		}

		let boost = message.channel.guild.premiumTier;
		let emotes = message.channel.guild.emojis.map((e) => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`).join(' ');
		let totalMembers = message.channel.guild.members.size;
		let onlineMembers = message.channel.guild.members.filter((u) => u.status === 'online').length;
		let idleMembers = message.channel.guild.members.filter((u) => u.status === 'idle').length;
		let offlineMembers = message.channel.guild.members.filter((u) => u.status === 'offline').length;
		let dndMembers = message.channel.guild.members.filter((u) => u.status === 'dnd').length;

		let rol = message.channel.guild.roles
			.filter((e) => e.id !== message.channel.guild.id)
			.sort((a, b) => b.position - a.position)
			.map((e) => e.mention);
		let special = [];
		if (
			message.channel.guild.id === '676102400196477082' ||
			message.channel.guild.id === '652566477488128020' ||
			message.channel.guild.id === '620061793179402240' ||
			message.channel.guild.id === '650128487511883796' ||
			message.channel.guild.id === '661508802604040212' ||
			message.channel.guild.id === '689243278666760201'
		) {
			special.push(`${crown} This is a special server!`);
		}

		let gName = message.channel.guild.name;
		let oMention = `<@!${message.channel.guild.ownerID}>`;
		let gIcon = message.channel.guild.iconURL;
		let cText = message.channel.guild.channels.filter((c) => c.type === 0).length;
		let cVC = message.channel.guild.channels.filter((c) => c.type === 2).length;
		let cCate = message.channel.guild.channels.filter((c) => c.type === 4).length;
		let cOther = message.channel.guild.channels.filter((c) => c.type === 3 && c.type === 5).length;
		let cAll = message.channel.guild.channels.size;
		let bots = message.channel.guild.members.filter((m) => m.bot).length;
		let humans = message.channel.guild.members.filter((m) => !m.bot).length;
		let bPercent = ((message.channel.guild.memberCount - bots) / message.channel.guild.memberCount * 100).toFixed(
			2
		);

		if (!emotes) {
			emotes = 'None';
		}
		if (!rol) {
			rol = 'None';
		}
		if (rol.length >= 1024) {
			rol = 'Too many roles to show';
		}
		if (emotes.length >= 1024) {
			emotes = 'Too many emotes to show';
		}

		//so, i've got: roles, name, icon, boosts, region, id, owner and id, verification, created at, joined at, partners, special category, channels, vc's,
		try {
			//what i need: and actually show the emotes and not the names.
			client.createMessage(message.channel.id, {
				embed: {
					thumbnail: { url: gIcon },
					title: special.join(' '),
					footer: { text: `ID: ${message.channel.guild.id} | ShardID: ${message.channel.guild.shard.id}` },
					author: {
						name: gName,
						icon_url: gIcon
					},

					fields: [
						{
							name: '**General Information**',
							value: `**Name:** ${gName}\n**Owner:** ${oMention}\n**Region:** ${region}\n**User Percentage:** ${bPercent}%\n**Verification Level:** ${verification}\n**Created At:** ${cr}\n**Lost Joined At:** ${ja}`
						},
						{
							name: `**Members [${totalMembers}]**`,
							value: `${online} **Online:** ${onlineMembers}\n${idle} **Idle:** ${idleMembers}\n${dnd} **Do not Disturb:** ${dndMembers}\n${offline} **Offline:** ${offlineMembers}`,
							inline: true
						},
						{
							name: `**Channels [${cAll}]**`,
							value: `:keyboard: **Text:** ${cText}\n:open_file_folder: **Categories:** ${cCate}\n:microphone: **Voice:** ${cVC}\n:grey_question: **Other:** ${cOther}`,
							inline: true
						},
						{
							name: `**Roles [${message.channel.guild.roles.size - 1}]**`,
							value: `${rol.join(' ')}`
						},
						{
							name: `**Emotes [${message.channel.guild.emojis.length}]**`,
							value: emotes
						}
					]
				}
			});
		} catch (e) {
			console.log(e);
			message.channel.createMessage(`\`\`\`js\n${e}\`\`\``);
		}
	}
};
