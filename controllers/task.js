import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201)
            .json({
                success: true,
                message: "Task created successfully"
            })
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {

        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });
        res.status(200)
            .json({
                success: true,
                tasks,
            })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task)
            return next(new ErrorHandler("Task not found", 404))


        // return res
        //     .status(404)
        //     .json({
        //         success: false,
        //         message: "Invalid Id"
        //     })

        task.isCompleted = !task.isCompleted

        await task.save();

        res.status(200)
            .json({
                success: true,
                message: "Task updated successfully"
            })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task)
            return next(new ErrorHandler("Task not found", 404))
        // return next(new Error("Task not found"))
        // return res
        //     .status(404)
        //     .json({
        //         success: false,
        //         message: "Invalid Id"
        //     })

        await task.deleteOne();

        res.status(200)
            .json({
                success: true,
                message: "Task deleted successfully"
            })
    } catch (error) {
        next(error);
    }
}
