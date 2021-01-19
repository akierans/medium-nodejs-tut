import bodyParser from 'body-parser';
import express from 'express';
import user from './routes/user';
import {MongoClient} from 'mongodb';

const CONN_URL = 'mongodb://localhost:27017';
let mongoClient = null;
MongoClient.connect(CONN_URL, { useNewUrlParser: true }, function (err, client) {
	mongoClient = client;
})

let app = express();
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())
app.use((req,res,next)=>{
	req.db = mongoClient.db('test');
	next();
})

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