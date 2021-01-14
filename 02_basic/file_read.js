const fs = require('fs');

console.log(' Start *********************** ');
fs.readFile('rhyme.txt', 'utf8', (err,data)=>{
	if(err){
		throw err;
	}
	console.log(data);
})
console.log('End *********************** ');

