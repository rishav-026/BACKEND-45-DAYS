const express = require('express');
const users = require('./MOCK_DATA.json')
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
// app.use(express.json());
app.use(express.urlencoded({extended:true}))
//Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB",err);
});
//Schema 
const userSchema  = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    job_title:{
        type:String,
    },
    gender:{
        type:String,
    },
});

const User = mongoose.model('user',userSchema);
//Handler function
app.use((req,res,next)=>{
    fs.appendFile('logs.txt',`\n${Date.now()}:${req.method}:${req.path}\n`,(err,data)=>{
        if(err) console.error('Error writing to log file');
    })
    next();
})

const PORT = 8000;

//Routes
app.get('/',(req,res)=>{
    return res.send("Hello express");
})
app.get('/api/users',(req,res)=>{
    return res.json(users);
})
app.get('/users',(req,res)=>{
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `
    return res.send(html);
})
app.get('/api/users/:id',)


app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user=>user.id===id)
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({status:"pending"})
})
.delete((req,res)=>{
    const id = Number(req.params.id);
    const index = users.findIndex(user=>user.id===id);

    if(index===-1) return res.json({status:"failed",message:"User not found"})
    users.splice(index,1);
    res.json({status:"success",message:"User deleted successfully"})
});



app.post('/api/users',(req,res)=>{
   const body = req.body;
   users.push({...body,id:users.length+1});
   fs.writeFileSync('./MOCK_dATA.json', JSON.stringify(users),(err,data)=>{
    if(err) return res.json({status:"failed"})
    return res.json({status:"success" , id:users.length})
   });
    
});
app.patch('/api/users/:id',(req,res)=>{
    return res.json({status:"success"})
})

app.delete('/api/users/:id',(req,res)=>{

    return res.json({status:"success"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});