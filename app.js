const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const expressValidator=require("express-validator");
const cookieParser=require("cookie-parser");
const dotenv = require("dotenv"); 
const cors = require('cors');

dotenv.config();  
  
mongoose.connect('mongodb://localhost:27017/nodeapi',{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("DB connected");
});
mongoose.connection.on('error', err => {
    console.log('DB connection error :',err.message);
});

const postRoutes=require("./routes/post");
const userRoutes=require("./routes/user");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/",postRoutes);
app.use("/",userRoutes);
app.use(cors());


app.use(function(err,req,res,next){
    if(err.name==="UnauthorizedError"){
        res.status(401).json({
            error: "Unauthorised!!"
        });
    } 
});

const port=process.env.PORT || 8080;//either use PORT of .env or 8080
app.listen(port,()=>{
    console.log("server started on 8080");
});