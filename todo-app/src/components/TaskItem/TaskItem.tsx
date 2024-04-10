import { useState } from "react";
import { Task } from "../../types/Task"


type TaskItemProps = {
    task: Task,
    deleteTask: (id: number) => void,
    putTask: (task: Task, id: number) => void
}

function TaskItem(props: TaskItemProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.task.text);
    function deleteTask() {
        props.deleteTask(props.task.id);
    }

    function editTask() {
        if (isEdit && props.task.text !== text) {
            props.putTask({ id: props.task.id, text: text }, props.task.id);
        }

        setIsEdit(!isEdit);
    }

    function changeInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        const text = event.target.value;
        setText(text);

    }

    return (
        <>
            {isEdit ? <textarea value={text} onChange={changeInput} /> : <span>{text}</span>}
            <button onClick={editTask}>o</button>
            <button onClick={deleteTask}>×</button>
        </>
    )
}

export default TaskItem