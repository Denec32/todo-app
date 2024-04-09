import { SetStateAction, useState } from "react";
import { taskApi } from "../repositories/taskApi";
import { Task } from "../types/Task";

type TaskFormProps = {
    setTasks: React.Dispatch<SetStateAction<Task[]>>
}

function TaskForm(props: TaskFormProps) {
    const [inputText, setInputText] = useState<string>("");

    function changeInputText(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setInputText(event.currentTarget.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            text: { value: string };
        };

        const text = target.text.value;
        taskApi.addTask({ id: 0, text: text })
            .then(task => props.setTasks((tasks) => [...tasks, task]));

        setInputText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={changeInputText} type='text' name='text' value={inputText}></input>
            <button type='submit'>add</button>
        </form>
    )
}

export default TaskForm