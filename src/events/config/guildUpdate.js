module.exports = async (client, guild, oldGuild) => {
	let g = require('../../models/Guild');
	let Guild = await g.findOne({ id: guild.id });
	let channel = Guild.logs.action.channel;
	if (!channel || !Guild.logs.action.enabled) return;

	if (oldGuild.name !== guild.name) {
		let oo = await guild.getAuditLogs(1, null, 1).then((e) => e.entries[0]);
		let by = oo.user.id;
		client.createMessage(channel, {
			embed: {
				title: 'Server Renamed',
				description: `The server name was renamed by <@!${by}>.`,
				fields: [
					{
						name: 'Old Name',
						value: oldGuild.name,
						inline: true
					},
					{
						name: 'New Name',
						value: guild.name,
						inline: true
					}
				],
				timestamp: new Date(),
				footer: { text: `ID: ${guild.id}` },
				author: { name: ` |  ${guild.name}`, icon_url: guild.iconURL },
				color: Number(require('../../config').colours.yellow)
			}
		});
	} else if (oldGuild.verificationLevel !== guild.verificationLevel) {
		let verification = oldGuild.verificationLevel;
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
		let oof = guild.verificationLevel;
		if (oof === 0) oof = 'None';
		if (oof === 1) oof = 'Low';
		if (oof === 2) oof = 'Medium';
		if (oof === 3) oof = 'High';
		if (oof == 4) oof = 'Extreme';
		let oo = await guild.getAuditLogs(1, null, 1).then((e) => e.entries[0]);
		let by = oo.user.id;
		client.createMessage(channel, {
			embed: {
				title: 'Server Verification Level Changed',
				description: `The servers verification level was updated by <@!${by}>`,
				fields: [
					{
						name: 'Old Level',
						value: `${oldGuild.verificationLevel} (${verification})`,
						inline: true
					},
					{
						name: 'New Level',
						value: `${guild.verificationLevel} (${oof})`,
						inline: true
					}
				],
				timestamp: new Date(),
				color: Number(require('../../config').colours.green),
				footer: { text: `ID: ${guild.id}` },
				author: { name: ` |  ${guild.name}`, icon_url: guild.iconURL }
			}
		});
	} else if (oldGuild.ownerID !== guild.ownerID) {
		const aV = await client.getRESTUser(guild.ownerID);
		const av = `https://cdn.discordapp.com/avatars/${guild.ownerID}/${aV.avatar}.jpg?size=128`;
		client.createMessage(channel, {
			embed: {
				title: 'Server Owner Changed',
				description: 'The server owner gave the server away.',
				color: Number(require('../../config').colours.green),
				timestamp: new Date(),
				author: { name: ` |  ${guild.name}`, icon_url: av },
				footer: { text: `ID: ${guild.id}` },
				fields: [
					{
						name: 'Old Owner',
						value: `<@!${oldGuild.ownerID}>`,
						inline: true
					},
					{
						name: 'New Owner',
						value: `<@!${guild.ownerID}>`,
						inline: true
					}
				]
			}
		});
	} else if (oldGuild.region !== guild.region) {
		let oo = await guild.getAuditLogs(1, null, 1).then((e) => e.entries[0]);
		let by = oo.user.id;
		let region = oldGuild.region;
		let a = guild.region;
		let av = guild.iconURL;
		if (a === 'europe') {
			a = 'Europe';
			av =
				'https://cdn.discordapp.com/attachments/702241622926295092/704739155510427648/640px-Flag_of_Europe.png';
		}

		if (a === 'brazil') {
			a = 'Brazil';
			av =
				'https://media.discordapp.net/attachments/702241622926295092/704735642541752360/brazili-flaf.png?width=676&height=473';
		}
		if (a === 'hongkong') {
			a = 'Hong Kong';
			av = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg';
		}
		if (a === 'india') {
			a = 'India';
			av = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png';
		}
		if (a === 'japan') {
			a = 'Japan';
			av = 'https://cdn.discordapp.com/attachments/702241622926295092/704736075037278258/Flag-Japan.png';
		}
		if (a === 'singapore') {
			a = 'Singapore';
			av = 'https://cdn.discordapp.com/attachments/702241622926295092/704736226141274242/Flag_of_Singapore.png';
		}
		if (a === 'russia') {
			a = 'Russia';
			av =
				'https://cdn.discordapp.com/attachments/702241622926295092/704736467976454224/russian-flag-russian-flag-russia-flag-of-russia.png';
		}
		if (a === 'southafrica') {
			a = 'South Africa';
			av =
				'https://cdn.discordapp.com/attachments/702241622926295092/704736742661554227/1200px-Flag_of_South_Africa.png';
		}
		if (a === 'sydney') {
			a = 'Australia';
			av =
				'https://cdn.discordapp.com/attachments/702241622926295092/704736938392813668/1200px-Flag_of_Australia_28converted29.png';
		}
		if (a === 'us-central') {
			a = 'Central USA';
			av =
				'https://media.discordapp.net/attachments/702241622926295092/704737823973965834/1200px-Flag_of_the_United_States.png?width=899&height=474';
		}
		if (a === 'us-east') {
			a = 'Eastern USA';
			av =
				'https://media.discordapp.net/attachments/702241622926295092/704737823973965834/1200px-Flag_of_the_United_States.png?width=899&height=474';
		}
		if (a === 'us-south') {
			a = 'Southern USA';
			av =
				'https://media.discordapp.net/attachments/702241622926295092/704737823973965834/1200px-Flag_of_the_United_States.png?width=899&height=474';
		}
		if (a === 'us-west') {
			a = 'Western USA';
			av =
				'https://media.discordapp.net/attachments/702241622926295092/704737823973965834/1200px-Flag_of_the_United_States.png?width=899&height=474';
		}
		if (region === 'europe') region = 'Europe';
		if (region === 'brazil') region = 'Brazil';
		if (region === 'hongkong') region = 'Hong Kong';
		if (region === 'india') region = 'India';
		if (region === 'japan') region = 'Japan';
		if (region === 'singapore') region = 'Singapore';
		if (region === 'russia') region = 'Russia';
		if (region === 'southafrica') region = 'South Africa';
		if (region === 'sydney') region = 'Australia';
		if (region === 'us-central') region = 'Central USA';
		if (region === 'us-east') region = 'Eastern USA';
		if (region === 'us-south') region = 'Southern USA';
		if (region === 'us-west') region = 'Western USA';

		client.createMessage(channel, {
			embed: {
				title: 'Server Region Changed',
				description: `The region of the server was changed by <@!${by}>`,
				color: Number(require('../../config').colours.yellow),
				timestamp: new Date(),
				author: { name: ` |  ${guild.name}`, icon_url: av },
				footer: { text: `ID: ${guild.id}` },
				fields: [
					{
						name: 'Old Region',
						value: region,
						inline: true
					},
					{
						name: 'New Region',
						value: a,
						inline: true
					}
				]
			}
		});
	} else {
		return;
	}
};
