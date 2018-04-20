import * as MongoDB from "mongodb";
///<reference path="node_modules/@types/mongodb/index.d.ts"/>

const MongoClient = MongoDB.MongoClient;
const url = "mongodb://localhost:27017/demo2"

interface db_int
{
    get(query:string,call :(response:string)=>void);
    get_all(call:(response:string)=>void)
    set(s:any,call:(response:string)=>void);
}

export default class imp_db implements db_int
{
    constructor()
    {

    }

    get_all(call:(response:string)=>void)
    {
        MongoClient.connect(url,function(err,db){
            if(err) throw err;
            let dbo =db.db("demo2").collection("Messages").find({}).toArray(function(err,result){
                if(err) throw err;
                db.close();
                call(JSON.stringify(result));
            })
        })
    }
    getConversation(currentUser, chattingUser, call:(response:string)=>void)
    {
        console.log(currentUser);
        console.log(chattingUser);
        MongoClient.connect(url,function(err,db){
            if(err) throw err;
            let dbo =db.db("demo2").collection("Messages").find({
                $or: [
                    { receiver: currentUser, sender:chattingUser },
                    { receiver: chattingUser, sender:currentUser },
                ]}).toArray(function(err,result){
                    if(err) throw err;
                    db.close();
                    call(JSON.stringify(result));
                });
        })
    }

    get(key:string,call:(response:string)=>void)
    {
        MongoClient.connect(url,function(err,db){
            if(err) throw err;
            console.log(key);
            let query = {};
            query[key] = {$exists:true};
            console.log(query);
            let dbo = db.db("demo2").collection("demo2Chat").find(query).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                call(JSON.stringify(result))
            });
        })
    }

    set(s:any,call:(response:string)=>void)
    {
        MongoClient.connect(url, function(err, db) {
            if (err) 
            {
                call('{"result"="ko"}');
                throw err;
            }
            var dbo = db.db("demo2");
            var myobj = s;
            dbo.collection("Messages").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
              call('{"result"="ok"}');
            });
        });
    }
}
