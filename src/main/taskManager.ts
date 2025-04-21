import { loadTasks, saveTasks } from './storage';
import { v4 as uuidv4 } from 'uuid';

// Define the structure of a task for better type safety
interface Task {
  id: string;
  name: string;
  recurring: boolean;
  dueToday: boolean;
  recurringTiming: string | null;
  priority: 'low' | 'medium' | 'high';
}

interface TaskData {
  todoList: Task[];
}

let tasks: Task[] = loadTasks().todoList;



/**
 * Adds a new task by taking in new JSON data with properties id, name, recurring, dueToday, recurringTiming, and priority
 * @param task Task object to add
 * @returns the updated tasks
 */
function addTask(task: Task): Task[]  {
  // Ensure task has an id (if not, generate one)
  if (!task.id) {
    task.id = generateID(); // Create a function to generate unique IDs
  }

  tasks.push(task);
  saveTasks({ todoList: tasks });
  return tasks;
}

/**
 * Removes a task by its id
 * @param id ID of the task to remove
 */
function removeTask(id: string): Task[] {
  const taskIndex = findIDIndex(id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasks({ todoList: tasks });
  } else {
    console.error(`Task with id ${id} not found.`);
  }

  return tasks;
}

/**
 * Modifies a property of a single task
 * @param id ID of the task to modify
 * @param property Property to modify (e.g., 'name', 'dueToday')
 * @param data New value for the property
 */
function modifyTask<K extends keyof Task>(id: string, property: K, data: Task[K]): Task[] {
  const taskIndex = findIDIndex(id);
  if (taskIndex !== -1) {
    tasks[taskIndex][property] = data;
    saveTasks({ todoList: tasks });
  } else {
    console.error(`Task with id ${id} not found.`);
  }
  return tasks;
}



/**
 * Helper function that finds the index of a task by its ID
 * @param id ID of the task to find
 * @returns The index of the task, or -1 if not found
 */
function findIDIndex(id: string): number {
  return tasks.findIndex(task => task.id === id);
}

/**
 * Generates a unique ID for each task (you can customize this if you want)
 * @returns A unique ID
 */
function generateID(): string {
  return uuidv4();
}

export { addTask, removeTask, modifyTask, TaskData };
