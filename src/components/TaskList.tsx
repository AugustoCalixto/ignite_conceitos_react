import { useState } from 'react'
//import { uid } from '';


import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  function handleCreateNewTask(title: string) {
    // // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!title.trim()) {
      console.log( 'Error');
      return
    };

    const new_task: Task = {
      id: Math.random(),
      title,
      isComplete: false
    };

    const all_tasks: Task[] = [...tasks, new_task];

    setTasks(all_tasks);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const done_task = tasks.map((task) => task.id === id ? {...task, isComplete: !task.isComplete} : task)
    console.log(tasks)
    setTasks(done_task) ;
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const new_tasks = tasks.filter((element) => {
      return element.id !== id;
    })
    console.log(new_tasks)
    setTasks(new_tasks)

    

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={event => handleCreateNewTask(newTaskTitle)}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}