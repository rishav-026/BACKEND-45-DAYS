const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const filePath = path.join(__dirname , 'server1.log');//add a server.log file to the current directory

async function logMessage(message){
  const timestamp = new Date().toISOString();//gets current date and time
  const platform = os.platform();//gets os

  //creating a log line
  const logEntry = `[${timestamp}] [${platform}] [${message}] [${filePath}]\n`

  await fs.appendFile(filePath , logEntry )
  console.log(logEntry);
}

async function readLogs(){
  try{
    const data = await fs.readFile(filePath, 'utf8');
    console.log('log file content:');
    console.log(data);
  }
  catch(err){
    console.log('error reading log file:',err);

  }
}

async function main(){

  await logMessage('Server started');
  await logMessage('Received a request');
  await readLogs();
}

main();