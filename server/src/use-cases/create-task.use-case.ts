import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskInput } from "../validators/task.validator";
import { TimeService } from "../services/time.service";

export class CreateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private timeService: TimeService
    ) { }

    async execute(taskData: CreateTaskInput, mobileNo: string) {
        const currentTime = await this.timeService.getCurrentTime();
        
        return await this.taskRepository.create({
            ...taskData,
            mobileNo,
            currentDate: currentTime
        });
    }
}
