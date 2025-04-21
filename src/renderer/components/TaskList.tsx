import '../App.css';
import Task from './Task';
import { useState, useEffect } from 'react';

interface TaskItem {
  id: string;
  name: string;
  recurring: boolean;
  dueToday: boolean;
  recurringTiming: string | null;
  priority: 'low' | 'medium' | 'high';
}

// Define the data interface
interface TaskData {
  todoList: TaskItem[];
}


export default function TaskList() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await window.electron.taskAPI.getTasks();      ;
      setTasks(result.todoList);
    };

    fetchTasks();
  }, []);


  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          name={task.name}
          recurring={task.recurring}
          dueToday={task.dueToday}
          recurringTiming={task.recurringTiming}
          priority={task.priority}
        />
      ))}
    </div>
  );
}

