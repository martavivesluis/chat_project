import { uri } from './configuration/enumsDb';
var mongoose = require('mongoose');
var Database = {
    connect: () => mongoose.connect('mongodb://localhost:27017',),
    };
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open?');
});
mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
export default Database;
