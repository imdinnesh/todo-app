import { TaskRepository } from "../../repositories/task.repository";

export class UpdateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    // Inside edit-task.use-case.ts
    async execute(taskId: string, newTitle: string, newDescription: string) {
        // 1. Fetch
        const task = await this.taskRepository.getTaskById(taskId);

        // 2. Modify
        task.update(newTitle, newDescription);

        // 3. Save
        await this.taskRepository.saveTask(task);
    }

}

