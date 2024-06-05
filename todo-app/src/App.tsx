import { useEffect, useState } from 'react'
import { taskApi } from './repositories/taskApi';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm/TaskForm';
import './App.css'
import TaskItem from './components/TaskItem/TaskItem';
import LoginWindow from './components/LoginWindow/LoginWindow';
import { cookieApi } from './repositories/cookieApi';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showLoginWindw, setShowLoginWindow] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(cookieApi.hasJwt());
    const [username, setUsername] = useState<string>('Guest');
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

    function logout() {
        cookieApi.deleteJwt();
        setLoggedIn(false);
    }

    return (
        <>
            {showLoginWindw && <LoginWindow setLoggedIn={setLoggedIn} setLoginUsername={setUsername}/>}
            <h1>{loggedIn ? username : 'No one'}' silly todo list.</h1>
            <h1>
                {loggedIn ? <a onClick={logout}>Log out</a> : <a onClick={handleShowLoginWindow}>Login</a>}
            </h1>
            {loggedIn ? 
            <>
            <ul>
                { tasks.map(task => <TaskItem key={task.id} task={task} deleteTask={deleteTask} putTask={putTask} />)}
            </ul>
            <TaskForm onClickAdd={addTask} />
            </> : <></>
            }
        </>
    )
}

export default App
