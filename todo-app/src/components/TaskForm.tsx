import { SetStateAction } from "react";
import { taskApi } from "../repositories/taskApi";
import { Task } from "../types/Task";

type TaskFormProps = {
    setTasks: React.Dispatch<SetStateAction<Task[]>>
}

function TaskForm(props: TaskFormProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            text: { value: string };
        };

        const text = target.text.value;
        const newTask = taskApi.addTask({ id: 0, text: text });
        props.setTasks((tasks) => [...tasks, newTask]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='text'></input>
            <button type='submit'>add</button>
        </form>
    )
}

export default TaskForm