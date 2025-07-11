export interface Subtask {
  id: number;
  name: string;
  completed: boolean;
}

export interface Task {
  id: number;
  name: string;
  date: string;
  time: string;
  completed: boolean;
  subtasks?: Subtask[];
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  toggleSubtask: (taskId: number, subtaskId: number) => void;
  getTasksByDate: (date: string) => Task[];
} 