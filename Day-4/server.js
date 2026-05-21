//Synchronous code
// const fs = require('fs');
// console.log("start");
// const data1 = fs.writeFileSync('hello.txt', 'hello');
// const data =  fs.readFileSync('data.txt','utf-8');
// console.log(data);
// console.log("end");


//Asynchronous code
// const fs = require('fs');
// console.log("start");
// fs.readFile('data.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
//         console.log("end");

// });

//Callback Hell
// Read file, then query database, then send email — nested nightmare
const fs = require('fs');
const db = require('./db');
const email = require('./email');
fs.readFile('./user.txt', (err, data) => {
  if (err) return console.error(err);
  
  db.query('SELECT * FROM users', (err, users) => {
    if (err) return console.error(err);
    
    email.send(users, (err, result) => {
      if (err) return console.error(err);
      
      console.log('Done!');  // buried 4 levels deep
    });
  });
});
