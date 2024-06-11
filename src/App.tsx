import { useState, useEffect } from 'react';
import { Header } from './components/Header';
// import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoList } from './components/TodoList/TodoList';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      if (Array.isArray(parsedTasks)) {
        setTasks(parsedTasks);
        console.log("Loading tasks from local storage:", parsedTasks);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Saving tasks to local storage", tasks);
  }, [tasks]);

  function addTask(taskTitle: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    console.log("Task added:", newTask);
  }

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    console.log("Task Deleted:", taskId);
  }

  function toggleTaskCompletedById(taskId: string) {
    const updatedTasks = tasks.map(task => {
      if(task.id === task.id) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log("Task toggled:", taskId);
  }

  function updateTaskTitle(taskId: string, newTitle: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId ) {
        return {
          ...task,
          title: newTitle
        };
    }
    return task;
  });
  setTasks(updatedTasks);
  console.log("task updated:", taskId, newTitle);
}

  return (
    <>
    <Header onAddTask={addTask}/>
    <TodoList 
      onDelete={deleteTaskById}
      tasks={tasks}
      onComplete={toggleTaskCompletedById}
      onUpdate={updateTaskTitle}

     />
    </>
  )
}

export default App
