import { TaskRepositoryInterface } from "../../Application/Repository/TaskRepository";
import { Task } from "../../Domain/Task";

export class TaskController {
    private taskRepository: TaskRepositoryInterface;

    constructor(tr: TaskRepositoryInterface) {
        this.taskRepository = tr;
    }

    async createTask(task: Task) {
        await this.taskRepository.createTask(task);
    }

    async deleteTask(task: Task) {
        await this.taskRepository.deleteTask(task);
    }
}