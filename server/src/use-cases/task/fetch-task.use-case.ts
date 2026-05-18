import { TaskRepository } from "../../repositories/task.repository";

export class FetchTasksUseCase {
    constructor(
        private taskRepository: TaskRepository,
    ) { }

    async fetchTasksByMobileNo(mobileNo: string) {
        const tasks = await this.taskRepository.getTasksByMobileNo(mobileNo);
        return tasks;
    }

    async fetchAllTasks() {
        const tasks = await this.taskRepository.getAllTasks();
        return tasks;
    }

    async fetchTaskSummaries(mobileNo: string) {
        return this.taskRepository.getTaskSummaries(mobileNo);
    }
}
