const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;//refer to id of any schema

const postSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true
        // required: "title required",
        // minlength: 4,
        // maxlength: 150
    },

    body: { 
        type: String,
        required: true
        // required: "body required",
        // minlength: 4,
        // maxlength: 1000
    },
    photo:{
        data: Buffer,
        contentType: String//image info,file format etc
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{type: ObjectId,ref:"User"}]
})

module.exports=mongoose.model("Post",postSchema);