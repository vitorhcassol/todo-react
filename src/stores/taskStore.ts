import { create } from 'zustand';
import type { Task, TaskStore } from '../types/task';

const initialTasks: Task[] = [];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,

  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: Math.max(...get().tasks.map(t => t.id), 0) + 1
    };
    set((state) => ({
      tasks: [...state.tasks, newTask]
    }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  },

  toggleSubtask: (taskId, subtaskId) => {
    set((state) => ({
      tasks: state.tasks.map(task => {
        if (task.id === taskId && task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.map(subtask =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          };
        }
        return task;
      })
    }));
  },

  getTasksByDate: (date) => {
    return get().tasks.filter(task => task.date === date);
  }
})); 