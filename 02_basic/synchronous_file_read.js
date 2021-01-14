const fs = require('fs');

console.log('Start *********************** ');
let poem = fs.readFileSync('rhyme.txt', 'utf8');
console.log(poem)
console.log('End *********************** ');

