import { TaskDocument, TaskModel } from "../models/task.model";
import { Task } from "../entities/task.entity";
import { DatabaseErrorMapper } from "../utils/db.error.mapper";

//===INTERFACE (PORT)====
export interface TaskRepository {
    create(taskData: Partial<Task>): Promise<Task>;
    getTasksByMobileNo(mobileNo: string): Promise<Task[]>;
    getAllTasks():Promise<Task[]>;
    
}

//===MONGODB IMPLEMENTATION (ADAPTER)====
export class MongoTaskRepository implements TaskRepository {
    private mapToEntity(doc: TaskDocument): Task {
        return {
            id: (doc._id as any).toString(),
            title: doc.title,
            description: doc.description,
            mobileNo: doc.mobileNo,
            currentDate: doc.currentDate,
            endDate: doc.endDate,
            status: doc.status,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    async create(taskData: Partial<Task>): Promise<Task> {
        try {
            const doc = await TaskModel.create(taskData);
            return this.mapToEntity(doc);
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to create task");
        }
    }

    async getTasksByMobileNo(mobileNo: string): Promise<Task[]> {
        try {
            const tasks = await TaskModel.find({ mobileNo: mobileNo }).sort({ createdAt: -1 })
            return tasks.map(task => this.mapToEntity(task))
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to find user tasks");
        }
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            const tasks = await TaskModel.find({}).sort({ createdAt: -1 });
            return tasks.map(task => this.mapToEntity(task));
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to find all tasks");
        }
    }
}
