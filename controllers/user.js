import { User } from "../models/user.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";
import { sendCookie } from "../utils/features.js";


export const getAllusers = async (req, res) => {

}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })

        if (user) return next(new ErrorHandler("user already Exits", 400));


        const hasedPassword = await bycrypt.hash(password, 10);

        user = await User.create({ name, email, password: hasedPassword })

        sendCookie(user, res, "User successfully registered", 201);
    } catch (error) {
        next(error);
    }

}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        //as password has select false property so we need to add 
        if (!user)
            return next(new ErrorHandler("User not found", 404));

        const ismatched = await bycrypt.compare(password, user.password)

        if (!ismatched)
            return next(new ErrorHandler("Invalid email or password", 404));


        sendCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        next(error);
    }

}

export const getMyDetails = (req, res) => {

    res.status(200)
        .json({
            success: true,
            user: req.user,
        })
}

export const logout = (req, res) => {
    res.status(200)
        .cookie("token", "",
            {
                expires: new Date(Date.now()),
                sameSite: process.env.NODE_ENV==="development"?"lax":"none",
                secure:process.env.NODE_ENV==="development"?false:true,
            })
        .json({
            success: true,
            user: req.user,
        })
}