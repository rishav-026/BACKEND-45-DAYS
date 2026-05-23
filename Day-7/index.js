// const http = require('http');
// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{
//         'Content-Type':'application/json'
//     })
//     console.log(req.url);
//     console.log(req.method);
//     console.log(req.headers);
//     res.end(JSON.stringify({
//         name:"Rishav kumar",
//         age:22,
//         city:"Patna"
//     }))
// })
// server.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })


// const http= require('http');
// const server = http.createServer((req,res)=>{
//     const {url , method}= req;

//     if(url=='/' && method=='GET'){
//         res.writeHead(200,{'content-type':'application/json'})
//         res.end(JSON.stringify({
//             message:"Welcome to home page"
//         }))
//         return;
//     }
//     if(url=='/users' && method=='GET'){
//         const users =[
//             {id:1,name:"Rishav Kumar"},
//             {id:2,name:"Rahul Kumar"},
//             {id:3,name:"Satyarth Kumar"}
//         ]
//         res.writeHead(200,{'content-type':'application/json'});
//         res.end(JSON.stringify(users));
//         return;
//     }
//     if (url === '/about' && method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('This is the about page');
//     return;
//   }

// })
// server.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })

const http = require('http');
const server = http.createServer((req, res) => {
    const {url , method }=req;

    if(url==='/' && method==='GET'){
        res.writeHead(200,{'content-type':'appication/json'})
        res.end(JSON.stringify({
            message:"welcome to the home page"
        }))
    }
    if(url==='/users' && method==='GET'){
        const users = [
            {id:1 , name:"Rishav Kumar"},
            {id:2 , name:"Rahul Kumar"},
            {id:3 , name:"Satyarth Kumar"}
        ]
        res.writeHead(200,{'content-type':'application/json'});
        res.end(JSON.stringify(users));
    }
}); 