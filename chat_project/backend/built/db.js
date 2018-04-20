"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDB = require("mongodb");
///<reference path="node_modules/@types/mongodb/index.d.ts"/>
const MongoClient = MongoDB.MongoClient;
const url = "mongodb://localhost:27017/demo2";
class imp_db {
    constructor() {
    }
    get_all(call) {
        MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            let dbo = db.db("demo2").collection("demo2Coll").find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                call(result);
            });
        });
    }
    get(key, call) {
        MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            console.log(key);
            let query = {};
            query[key] = { $exists: true };
            console.log(query);
            let dbo = db.db("demo2").collection("demo2Coll").find(query).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                call(result);
            });
        });
    }
    set(s, call) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                call('{"result"="ko"}');
                throw err;
            }
            var dbo = db.db("demo2");
            var myobj = s;
            dbo.collection("demo2Coll").insertOne(myobj, function (err, res) {
                if (err)
                    throw err;
                console.log("1 document inserted");
                db.close();
                call('{"result"="ok"}');
            });
        });
    }
}
exports.default = imp_db;
