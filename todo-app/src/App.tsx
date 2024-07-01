import { useEffect, useState } from 'react'
import { taskApi } from './repositories/taskApi';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm/TaskForm';
import './App.css'
import TaskItem from './components/TaskItem/TaskItem';
import { cookieApi } from './repositories/cookieApi';
import NavBar from './components/NavBar/NavBar';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setLoggedIn(cookieApi.hasJwt());
        if (isLoggedIn) {
            taskApi.getTasks()
            .then((res) => setTasks(res)); 
        }
    }, [isLoggedIn]);


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

    const taskList = tasks.map(task => <TaskItem key={task.id} task={task} deleteTask={deleteTask} putTask={putTask} />);

    return (
        <>
            <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            {isLoggedIn &&
                <>
                    <ul>{taskList}</ul>
                    <TaskForm onClickAdd={addTask} />
                </>
            }
        </>
    )
}

export default App
