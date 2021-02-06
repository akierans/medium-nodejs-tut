import express from 'express';
import bodyParser from 'body-parser';
import user from './routes/user';
import {MongoClient} from 'mongodb';
import {clientApiKeyValidation} from './common/authUtils';

//Load dotenv
const dotenv = require('dotenv');
dotenv.config();

//Pull credentials from .env file
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

//Connection string for MongoDB on network
const CONN_URL_NET = `mongodb://${username}:${password}@192.168.1.137:27017`;
//let CONN_URL = 'mongodb://localhost:27017';
let mongoClient = null;
MongoClient.connect(CONN_URL_NET, { useNewUrlParser: true }, function (err, client) {
	mongoClient = client;
})

//Initiate app
let app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())
app.use((req,res,next)=>{
	req.db = mongoClient.db('test');
	next();
})

app.use((req,res,next)=>{
   req.db = mongoClient.db('test');
   next();
});
app.use(clientApiKeyValidation);

app.get('/',(req,res,next)=>{
   res.status(200).send({
      status:true,
      response:'Hello World!'
   });
});
app.use('/user',user);

app.listen(30006,()=>{
   console.log(' ********** : running on 30006');
})

process.on('exit', (code) => {
	mongoClient.close();
	console.log(`About to exit with code: ${code}`);
});
process.on('SIGNT', function() {
	console.log("Caught interrupt signal");
	process.exit();
});

module.exports = app;