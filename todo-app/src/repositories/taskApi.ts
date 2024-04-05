import type {Task} from '../types/Task';

class TaskApi {
    getTasks(): Promise<Task[]> {
        const tasks: Task[] = [
            {id : 0, text : 'get up'},
            {id : 1, text : 'play puter gamez'},
            {id : 2, text : 'go to sleep'}
        ];

        return Promise.resolve(tasks);
    }
}

export const taskApi = new TaskApi();