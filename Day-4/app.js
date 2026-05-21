//This is the example of Async/Await in Node.js
// console.log("Starting application...");
// const fs = require('fs').promises;
// async function main(){
//     try{
//         const file = await fs.readFile('./data.txt', 'utf-8');
//         console.log("File read");
//         console.log(file);
//     } catch (error) {
//         console.error("Error reading file:", error);
//     }
// }
// main();


const fs = require('fs');
async function main(){
    try{
        const [file1,file2]=await Promise.all([
            fs.promises.readFile('./data.txt','utf-8'),
            fs.promises.readFile('./hello.txt','utf-8')
        ])
        console.log("Files read");
        console.log(file1,file2);
    }
    catch(error){
        console.log("Error showing in file  ", error);
    }
    }
main();
