import express from 'express';
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";

import {config} from "dotenv";
import cookieParser from 'cookie-parser';
import {errormiddleWare} from "./middlewares/error.js"
import cors from "cors";
export const app =express();
const router = express.Router();
config({
    path:"./data/config.env"
})


//using middleware 
app.use(express.json()); 
//use this express.json() before the router
app.use(cookieParser());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true, 
}));


//using routes
//we can add custom route name to each route related to the same db
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);


app.get('/',(req,res)=>{
    res.send("Nice server")
})


//this is default metjod of error handling of the tasks 
//so it has an extra parameter called error so as whenever the next is called with an error this 
//function will get executed
app.use(errormiddleWare);

