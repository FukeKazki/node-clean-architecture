import { Task } from "../../Domain/Task";

export interface TaskRepositoryInterface {
    createTask: (task: Task) => Promise<Task>;
    deleteTask: (task: Task) => Promise<Task>;
}