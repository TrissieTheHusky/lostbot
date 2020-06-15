const mongoose = require('mongoose');
module.exports = mongoose.connect(`mongodb://localhost/lost`, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});