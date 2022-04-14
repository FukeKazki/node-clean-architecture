import { Task } from "../../Domain/Task";
import { TaskRepositoryInterface } from "./TaskRepository";

export class TaskInmemoryRepository implements TaskRepositoryInterface {
    private taskList: Task[] = [];

    async createTask(task: Task) {
        this.taskList.push(task);
        return task;
    }

    async deleteTask(task: Task) {
        this.taskList.pop();
        return task;
    }
}