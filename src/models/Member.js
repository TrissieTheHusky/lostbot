const mongoose = require('mongoose');

const Member = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	blacklisted: {
		all: {
			type: Boolean
		},
		say: {
			amount: {
				type: Number
			},
			allowed: {
				type: Boolean
			}
		}
	},
	modlogs: [
		{
			guild: {
				id: {
					type: String
				},
				kicks: {
					reason: {
						type: String
					},
					mod: {
						type: String
					}
				}
			}
		}
	]
});
module.exports = mongoose.model('Member', Member);
