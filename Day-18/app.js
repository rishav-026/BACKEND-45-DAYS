
const require('dotenv').config();
const express= require('express');
const config=require('./config/config')
const app=express()

app.listen(config.PORT,()=>{
    console.log(`Server is running on port ${config.PORT} in ${config.Node_ENV} mode`);
})
