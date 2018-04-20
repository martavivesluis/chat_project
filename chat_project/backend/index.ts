import * as express from "express";
///<reference path="node_modules/@types/express/index.d.ts"/>
import * as body_parser from "body-parser";
///<reference path="node_modules/@types/body-parser/index.d.ts"/>
import database from "./db"
import * as ioLib from "socket.io"
///<reference path="node_modules/@types/socket.io/index.d.ts"/>
import * as serverLib from "http"
import  Database from './dataBase'
import Chat_Message from "./chat_Message"

const app = express();
const server = app.listen(8880);
const db = new database();
const io = ioLib(server);
const connectedUsers = [];

app.use(body_parser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
    res.header("Access-Control-Max-Age", "86400"); // 24 hours

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
    res.send(200);
    }
    else {
    next();
    }
    });


app.get('/',function(req,res){
    res.send('Aixo es un backend');
    console.log('entres?');
});

app.get('/get',function(req,res){
    db.get("dadodo",function(response:string){
        res.send(response);
    })
});

app.get('/get_all',function(req,res){
    db.get_all(function(response:string){
        res.send(response);
    })
});

app.get('/user/messages/:currentUser/:chattingUser',function(req,res){
    db.getConversation(req.params.currentUser, req.params.chattingUser, function(response:string){
        res.send(response);
    })
});

app.post('/set',function(req,res){
    db.set(req.body,function(response:string){
        res.send(response);
    })
});

io.on('connection',function(socket){

    socket.on('disconnect',function() {
        const disconnectedUser = connectedUsers.find((user) => user.socketid === socket.id); //replaces for mongoose db
        connectedUsers.splice(connectedUsers.indexOf(disconnectedUser),1);
        socket.broadcast.emit('newDisconnectedUser', disconnectedUser);
    });

    socket.on('publicMessage',function(msg){
        db.set(JSON.parse(msg),function(response:string){});
        io.emit('publicMessage',msg);
    });

    socket.on('newUser',function(msg){
        const user = {"socketid":socket.id,"username":JSON.parse(msg).name, id: Math.floor(Math.random() * (30 - 1)) + 1};
        socket.emit('allConnectedUsers', connectedUsers);
        socket.emit('currentConnectedUser', user);
        socket.broadcast.emit('newConnectedUser', user);
        // Save
        connectedUsers.push(user);
    });
    socket.on('privateMessage',function(msg){
        console.log("the msg: "+msg);
        const { receiver,...message } = JSON.parse(msg);//search the receiver in the msg and save as a constant, rest in message
        const { text,...mess } = JSON.parse(msg);
        const { date,...mes } = JSON.parse(msg);
        const receiverUser = connectedUsers.find((user) => user.id === receiver);//search the receiver socket to send the message
        const senderUser = connectedUsers.find((user) => user.socketid === socket.id);//search the user in db from the sender message
        socket.to(receiverUser.socketid).emit('privateMessage', { ...message, senderUser });//concatenacio
        const mymessage = new Chat_Message(senderUser.id,receiver,text,date);
        db.set(mymessage,function(response:string){});
    });
});