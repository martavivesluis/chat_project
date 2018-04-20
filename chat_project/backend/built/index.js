"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
///<reference path="node_modules/@types/express/index.d.ts"/>
const body_parser = require("body-parser");
///<reference path="node_modules/@types/body-parser/index.d.ts"/>
const db_1 = require("./db");
const ioLib = require("socket.io");
///<reference path="node_modules/@types/socket.io/index.d.ts"/>
const serverLib = require("http");
const index = express();
const server = new serverLib.Server(index);
const db = new db_1.default();
const io = ioLib(server);
index.use(body_parser.json());
index.get('/', function (req, res) {
    res.send('Aixo es un backend');
});
index.get('/get', function (req, res) {
    db.get("dadodo", function (response) {
        res.send(response);
    });
});
index.get('/get_all', function (req, res) {
    db.get_all(function (response) {
        res.send(response);
    });
});
index.post('/set', function (req, res) {
    db.set(req.body, function (response) {
        res.send(response);
    });
});
index.listen(8080, function () {
    console.log('http server init');
});
io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});
