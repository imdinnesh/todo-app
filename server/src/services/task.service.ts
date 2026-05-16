import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskInput } from "../validators/task.validator";
import { TimeService } from "./time.service";

export class TaskService {

    constructor(
        private taskRepository: TaskRepository,
        private timeService:TimeService
    ) { }

    createTask = async (taskData: CreateTaskInput,mobileNo:string) => {
        const currentTime=await this.timeService.getCurrentTime();
        const newTask = await this.taskRepository.create({
            ...taskData,
            mobileNo,
            currentDate: currentTime
        });
        return newTask;
    }

    getTasksByMobileNo = async (mobileNo:string) => {
        const tasks = await this.taskRepository.getTasksByMobileNo(mobileNo);
        return tasks;
    }

    getAllTasks = async () => {
        const tasks = await this.taskRepository.getAllTasks();
        return tasks;
    }

}