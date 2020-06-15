const { Schema, model } = require('mongoose');

const Guild = Schema({
	id: { type: String, indexes: true },
	owner: String,
	prefix: { default: ';;', type: String },
	welcome: { message: String, channel: String, enabled: Boolean },
	leave: { message: String, channel: String, enabled: Boolean },
	logs: { action: { channel: String, enabled: Boolean }, mod: { channel: String, enabled: Boolean } },
	automod: { enabled: Boolean, words: { type: Array, default: [] } },
	tags: { type: [ { name: { type: String }, response: { type: String } } ], default: [] },
	commands: { type: [ { name: { type: String }, response: { type: String } } ], default: [] },
	mute: { role: String },
	modules: { enabled: { type: Array }, disabled: { type: Array } },
	// moderations: [
	// 	{
	// 		mute: { user: { type: String }, reason: { type: String }, time: Number }
	// 	},
	// 	{
	// 		kick: { user: { type: String }, mod: { type: String }, reason: { type: String } }
	// 	}
	// ],
	moderations: {
		type: [
			{
				kick: {
					user: { type: String },
					reason: { type: String },
					case: { type: Number },
					mod: { type: String },
					time: { type: Number }
				}
			}
		],
		default: []
	},
	mod: { roles: [], only: Boolean }
	//	modrole: { type: [ { roles: { type: Array } } ], default: [] }
	// responders: { type: [ { name: { type: String }, response: { type: String } } ], default: [] }
});
module.exports = model('Guild', Guild);
