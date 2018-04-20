export class Chat_Message {
    constructor(sender: string,receiver: string,message:string,Date :Date) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.Date = Date;
    }
    sender: string;
    receiver: string;
    message: string;
    Date: Date;

}
export default Chat_Message



/*var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    userTo: String,
    userFrom: String,
    messageText: String,
    date: Date,
});
module.exports = mongoose.model('Message', MessageSchema);*/