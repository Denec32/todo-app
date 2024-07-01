import { useState } from "react";
import { Task } from "../../types/Task"
import './TaskItem.css'

type TaskItemProps = {
    task: Task,
    deleteTask: (id: number) => void,
    putTask: (task: Task, id: number) => void
}

function TaskItem(props: TaskItemProps) {
    const [text, setText] = useState<string>(props.task.text);

    function deleteTask() {
        props.deleteTask(props.task.id);
    }

    function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const text = event.target.value;
        props.putTask({ id: props.task.id, text: text }, props.task.id);

        setText(text);
    }

    return (
        <li className="todo-item">
            <input value={text} onChange={changeInput} className="todo-item-input"/>
            <button onClick={deleteTask} className="delete-button">×</button>
        </li>
    )
}

export default TaskItem