var mongoose = require('mongoose');
var MessageSchema = new mongoose.Schema({
    userTo: String,
    userFrom: String,
    messageText: String,
    date: Date,
    state: String
});
module.exports = mongoose.model('Message', MessageSchema);