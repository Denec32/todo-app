import { useEffect, useState } from 'react'
import './App.css'
import { taskApi } from './repositories/taskApi';
import { Task } from './types/Task';

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
      <h1>Denec's perefect todo list</h1>
      <ul>
        {tasks.map(task => {
          return (<li key={task.id}><p>{task.text}</p></li>)
        })}
      </ul>
    </>
  )
}

export default App
