const  fs = require('fs');

fs.writeFile('input.txt','hello World' ,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('File created successfully');
})
fs.readFile('input.txt', 'utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);
})

fs.mkdirSync('./uploads', { recursive: true });
fs.unlinkSync('./input.txt');