const dotenv = require('dotenv')
dotenv.config();
const express=require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const connectToDb = require('./db/db')
const apiRoutes = require('./routes')

connectToDb();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('api/',apiRoutes);

app.get("/",(req,res)=>{
    res.send("hello")
})

module.exports=app;