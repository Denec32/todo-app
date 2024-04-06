import type {Task} from '../types/Task';

class TaskApi {
    tasks: Task[] = [
        {id : 0, text : 'get up'},
        {id : 1, text : 'play puter gamez'},
        {id : 2, text : 'go to sleep'}
    ];

    constructor() {
        console.log('add task');
    }

    getTasks(): Promise<Task[]> {
        return Promise.resolve(this.tasks);
    }

    addTask(newTask: Task) : Task {
        newTask.id = this.tasks[this.tasks.length - 1].id + 1;
        this.tasks.push(newTask);
        return newTask;
    }
}

export const taskApi = new TaskApi();