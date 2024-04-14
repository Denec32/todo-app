import { useEffect, useState } from 'react'
import { taskApi } from './repositories/taskApi';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm/TaskForm';
import './App.css'
import TaskItem from './components/TaskItem/TaskItem';
import LoginWindow from './components/LoginWindow/LoginWindow';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showLoginWindw, setShowLoginWindow] = useState<boolean>(false);

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

    function addTask(task: Task) {
        taskApi.addTask(task)
            .then(task => setTasks((tasks) => [...tasks, task]));
    }

    function putTask(task: Task, id: number) {
        taskApi.putTask(task, id)
            .then(task => setTasks(tasks.map(t => t.id != task.id ? t : task)));
    }

    function handleShowLoginWindow() {
        setShowLoginWindow(!showLoginWindw);
    }


    return (
        <>
            {showLoginWindw && <LoginWindow/>}
            <h1>Denec's silly todo list. <a onClick={handleShowLoginWindow}>Login</a></h1>
            <ul>
                {tasks.map(task => <TaskItem key={task.id} task={task} deleteTask={deleteTask} putTask={putTask} />)
                }
            </ul>
            <TaskForm onClickAdd={addTask} />
        </>
    )
}

export default App
