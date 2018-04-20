var mongoose = require('mongoose');
var Message = require('../models/Message_model');

/* SAVE A MESSAGE */
export function saveMessage(msg) {
        Message.create(msg, function (err, post) {
            if (err) return next(err);
            return json(post)
            //res.json(post);
        });}
/* GET ALL THE MESSAGES */
export function getAllMessages(idReceiver,idSender){
         Message.find({ $or: [ { userTo: idReceiver, userFrom: idSender }, { userTo: idSender, userFrom:idReceiver } ] }).exec(function (err, messages) {
            if (err) return next(err);
            return json(messages)
            //res.json(messages);
        });
}
/*DELETE OLD MESSAGES */
export function deleteOldMessages(){}



