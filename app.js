const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const expressValidator=require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect('mongodb://localhost:27017/nodeapi',{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("DB connected");
});
mongoose.connection.on('error', err => {
    console.log('DB connection error :',err.message);
});

const postRoutes=require("./routes/post");
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/",postRoutes);

const port=process.env.PORT || 8080;//either use PORT of .env or 8080
app.listen(port,()=>{
    console.log("server started on 8080");
})  