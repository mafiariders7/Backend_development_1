import express from "express";
import { getAllusers,login, register, getMyDetails,logout } from "../controllers/user.js";
import { User } from "../models/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
//import the model to add/find data to the database 


const router = express.Router();
//now we can use the router to define routers realated to perticular task

router.get("/all", getAllusers);

router.post("/new", register)
router.post("/login", login)
router.get("/logout", logout)
//alwys write the dynamic routes to the end of the page
router.get("/me",isAuthenticated, getMyDetails)

export default router;