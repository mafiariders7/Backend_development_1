import mongoose from "mongoose"

//schema is the data type which will the model(~subfolder in database) consists of

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        select:false,
        required:true,
    },
    cetatedAt:{
        type:Date,
        default: Date.now(),
        required:true
    }
})

//crating the model
export const User =  mongoose.model("User",schema)