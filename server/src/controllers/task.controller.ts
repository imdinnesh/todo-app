import { NextFunction, Request, Response } from "express";
import { CreateTaskInput } from "../schemas/task.schema";
import { Task } from "../models/Task";
import { getCurrentDate } from "../services/time.service";
import { AppError } from "../utils/AppError";

export const createTask = async (req: Request<{}, {}, CreateTaskInput>, res: Response, next: NextFunction) => {
    try {
        const { title, description, expiryDate, status } = req.body;
        const mobileNo = req.tokenProperties?.mobileNo;

        if (!mobileNo) {
            return next(new AppError("User not authenticated", 401));
        }

        const currentDate = await getCurrentDate();
        
        await Task.create({
            title,
            description,
            mobileNo,
            currentDate,
            expiryDate: expiryDate instanceof Date ? expiryDate.toISOString() : expiryDate,
            status: status || 'pending'
        });

        res.status(201).json({
            status: "success",
            statusCode: 0,
            statusDesc: "Task created successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mobileNo = req.tokenProperties?.mobileNo;

        if (!mobileNo) {
            return next(new AppError("User not authenticated", 401));
        }

        const tasks = await Task.find({ mobileNo }).sort({ createdAt: -1 });

        res.status(200).json({
            status: "success",
            statusCode: 0,
            tasks
        });
    } catch (error) {
        next(error);
    }
}