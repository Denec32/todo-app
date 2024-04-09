import { Task } from "../../types/Task"


type TaskItemProps = {
    task : Task,
    onClickDelete : (id : number) => void
}

function TaskItem(props: TaskItemProps) {
    function deleteTask() {
        props.onClickDelete(props.task.id);
    }

    return (
        <>
            <span>{props.task.text}</span>
            <button onClick={deleteTask}>×</button>
        </>
    )
}

export default TaskItem