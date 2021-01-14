import bodyParser from 'body-parser';
import express from 'express';
import user from './routes/user';
let app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

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
module.exports = app;