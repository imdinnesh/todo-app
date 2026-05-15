import { TaskDocument, TaskModel } from "../models/task.model";
import { DatabaseErrorMapper } from "../utils/db.error.mapper";

//===INTERFACE====
export interface TaskRepository {
    create(taskData: Partial<TaskDocument>): Promise<TaskDocument>;
}

//===MONGODB IMPLEMENTATION====
export class MongoTaskRepository implements TaskRepository {
    async create(taskData: Partial<TaskDocument>): Promise<TaskDocument> {
        try {
            return await TaskModel.create(taskData);
        } catch (error: any) {
            throw DatabaseErrorMapper.map(error, "Failed to create task");
        }
    }
}
