const mongoose=require("mongoose");
const uuidv1=require("uuid/v1");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    //salt: String,//long randomly generated complicated string
    created: {
        type: Date,
        default: Date.now//in js we normally use like Date.now() but with mongoose like this     
    },
    updated: Date
})
 
userSchema.virtual("password")
.set(function(password){
    //create temp var _password
    this._password=password;//password=the password given by user
    //generate timestamp
   // this.salt=uuidv1();
    //encrypt password
    this.hashed_password=this.encryptPassword(password);//func we will make
})
.get(function() {
    return this._password;
})

//method
userSchema.methods={
    encryptPassword: function(password){
        if(!password)
            return "";
        try{
            return crypto.createHash("sha1")
                    .update(password)
                    .digest("hex");
        }
        catch(err)
        {
            return "";
        }
    },
    authenticate: function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    }

    
}
module.exports=mongoose.model("User",userSchema);