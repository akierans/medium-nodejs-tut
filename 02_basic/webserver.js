const http = require('http');

const server = http.createServer((req,res)=>{
	res.write('HelloWorld !!');
	res.end();
})
server.listen(30008,()=>{
	console.log('Server Listening on 30008')
})