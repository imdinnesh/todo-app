import { TaskDocument, TaskModel } from "../models/task.model";
import { Task } from "../entities/task.entity";
import { DatabaseErrorMapper } from "../utils/db.error.mapper";
import { NotFoundError } from "../utils/api.error";

//===INTERFACE (PORT)====
export interface TaskRepository {
    create(taskData: Partial<Task>): Promise<Task>;
    getTasksByMobileNo(mobileNo: string): Promise<Task[]>;
    getAllTasks(): Promise<Task[]>;
    saveTask(task:Task):Promise<Task>;
    getTaskById(id:string):Promise<Task>;

}

//===MONGODB IMPLEMENTATION (ADAPTER)====
export class MongoTaskRepository implements TaskRepository {
    private mapToEntity(doc: TaskDocument): Task {
        return new Task(
            (doc._id as any).toString(),
            doc.title,
            doc.mobileNo,
            doc.currentDate,
            doc.endDate,
            doc.status,
            doc.createdAt,
            doc.updatedAt,
            doc.description
        );
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

    async saveTask(task: Task): Promise<Task> {
        try {
            const doc = await TaskModel.findByIdAndUpdate(
                task.id,
                {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    updatedAt: task.updatedAt
                },
                { returnDocument: 'after' }
            );
            if (!doc) {
                throw new NotFoundError("Task not found");
            }
            return this.mapToEntity(doc);
        } catch (error: any) {
            if (error instanceof NotFoundError) throw error;
            throw DatabaseErrorMapper.map(error, "Failed to save task");
        }
    }

    async getTaskById(id: string): Promise<Task> {
        try {
            const doc = await TaskModel.findById(id);
            if (!doc) {
                throw new NotFoundError("Task not found");
            }
            return this.mapToEntity(doc);
        } catch (error: any) {
            if (error instanceof NotFoundError) throw error;
            throw DatabaseErrorMapper.map(error, "Failed to find task");
        }
    }
}
