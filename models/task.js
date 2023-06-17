import mongoose from "mongoose"

//schema is the data type which will the model(~subfolder in database) consists of

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        requied: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
 
    },
    cetatedAt: {
        type: Date,
        default: Date.now(),
    }
})

//crating the model
export const Task = mongoose.model("Task", schema)