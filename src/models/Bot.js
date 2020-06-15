const { Schema, model } = require('mongoose');

const Bot = new Schema({
	blacklisted: { type: Array, required: false, default: [] },
	id: String
	/* Other data */
});

module.exports = model('Bot', Bot, 'bot');
