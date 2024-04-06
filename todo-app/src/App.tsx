import { useEffect, useState } from 'react'
import { taskApi } from './repositories/taskApi';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskApi.getTasks()
      .then((data) => {
        setTasks(data);
      })
  });

  return (
    <>
      <h1>Denec's silly todo list</h1>
      <ul>
        {tasks.map(task => {
          return (<li key={task.id} id={task.id.toString()}><p>{task.text}</p></li>)
        })}
      </ul>
      <TaskForm setTasks={setTasks} />
    </>
  )
}

export default App
