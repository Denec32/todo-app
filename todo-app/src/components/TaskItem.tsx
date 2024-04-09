import { taskApi } from "../repositories/taskApi";
import { Task } from "../types/Task"


type TaskItemProps = {
    task: Task
}

function TaskItem(props: TaskItemProps) {
    function deleteTask() {
        console.log(props.task.text);
        taskApi.deleteTask(props.task.id);
    }

    return (
        <>
            <span>{props.task.text}</span>
            <button onClick={deleteTask}>x</button>
        </>
    )
}

export default TaskItem