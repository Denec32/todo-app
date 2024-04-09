import { useEffect, useState } from 'react'
import { taskApi } from './repositories/taskApi';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import './App.css'
import TaskItem from './components/TaskItem';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        taskApi.getTasks()
            .then((data) => {
                setTasks(data);
            })
    }, []);

    function deleteTask(id: number) {
        taskApi.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <>
            <h1>Denec's silly todo list</h1>
            <ul>
                {tasks.map(task => {
                    return (<li key={task.id}><TaskItem task={task} onClickDelete={deleteTask} /></li>)
                })}
            </ul>
            <TaskForm setTasks={setTasks} />
        </>
    )
}

export default App
