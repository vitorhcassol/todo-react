# Task Store - Gerenciamento de Estado com Zustand

Esta documentação explica como usar a store de tarefas implementada com Zustand.

## Estrutura da Store

### Tipos
```typescript
interface Task {
  id: number;
  name: string;
  date: string;
  time: string;
  completed: boolean;
  subtasks?: Subtask[];
}

interface Subtask {
  id: number;
  name: string;
  completed: boolean;
}
```

### Métodos Disponíveis

#### `useTaskStore()` - Hook principal
Retorna um objeto com todos os métodos e dados da store:

```typescript
const { 
  tasks,           // Array de todas as tarefas
  addTask,         // Adicionar nova tarefa
  updateTask,      // Atualizar tarefa existente
  deleteTask,      // Deletar tarefa
  toggleTask,      // Alternar status de conclusão
  toggleSubtask,   // Alternar status de subtarefa
  getTasksByDate   // Filtrar tarefas por data
} = useTaskStore();
```

## Como Usar

### 1. Ler dados da store
```typescript
import { useTaskStore } from '../stores/taskStore';

function MyComponent() {
  const { tasks, getTasksByDate } = useTaskStore();
  
  // Todas as tarefas
  const allTasks = tasks;
  
  // Tarefas de hoje
  const todayTasks = getTasksByDate("Today");
  
  return (
    <div>
      <p>Total de tarefas: {allTasks.length}</p>
      <p>Tarefas de hoje: {todayTasks.length}</p>
    </div>
  );
}
```

### 2. Adicionar nova tarefa
```typescript
import { useTaskStore } from '../stores/taskStore';

function AddTaskComponent() {
  const { addTask } = useTaskStore();
  
  const handleAddTask = () => {
    addTask({
      name: "Nova tarefa",
      date: "Today",
      time: "10:00 AM",
      completed: false
    });
  };
  
  return <button onClick={handleAddTask}>Adicionar Tarefa</button>;
}
```

### 3. Atualizar tarefa
```typescript
import { useTaskStore } from '../stores/taskStore';

function UpdateTaskComponent() {
  const { updateTask } = useTaskStore();
  
  const handleUpdateTask = (taskId: number) => {
    updateTask(taskId, {
      name: "Nome atualizado",
      completed: true
    });
  };
  
  return <button onClick={() => handleUpdateTask(1)}>Atualizar</button>;
}
```

### 4. Alternar status de conclusão
```typescript
import { useTaskStore } from '../stores/taskStore';

function TaskItem({ task }) {
  const { toggleTask } = useTaskStore();
  
  return (
    <div>
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span>{task.name}</span>
    </div>
  );
}
```

### 5. Alternar status de subtarefa
```typescript
import { useTaskStore } from '../stores/taskStore';

function SubtaskItem({ taskId, subtask }) {
  const { toggleSubtask } = useTaskStore();
  
  return (
    <div>
      <input 
        type="checkbox"
        checked={subtask.completed}
        onChange={() => toggleSubtask(taskId, subtask.id)}
      />
      <span>{subtask.name}</span>
    </div>
  );
}
```

### 6. Deletar tarefa
```typescript
import { useTaskStore } from '../stores/taskStore';

function DeleteTaskComponent() {
  const { deleteTask } = useTaskStore();
  
  const handleDelete = (taskId: number) => {
    deleteTask(taskId);
  };
  
  return <button onClick={() => handleDelete(1)}>Deletar</button>;
}
```

## Vantagens do Zustand

1. **Simples**: Menos boilerplate que Redux
2. **Leve**: Bundle size pequeno
3. **TypeScript**: Suporte nativo
4. **Flexível**: Não precisa de providers
5. **Performance**: Re-renderização otimizada

## Exemplos de Uso Avançado

### Computed Values
```typescript
function TaskStats() {
  const { tasks } = useTaskStore();
  
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = (completedTasks.length / tasks.length) * 100;
  
  return <div>Taxa de conclusão: {completionRate}%</div>;
}
```

### Seletores para Performance
```typescript
// Para melhor performance, use seletores
const useCompletedTasks = () => useTaskStore(state => 
  state.tasks.filter(task => task.completed)
);

const useTodayTasks = () => useTaskStore(state => 
  state.getTasksByDate("Today")
);
```

## Persistência (Opcional)

Para persistir o estado no localStorage:

```typescript
import { persist } from 'zustand/middleware';

export const useTaskStore = create(
  persist(
    (set, get) => ({
      // ... sua store aqui
    }),
    {
      name: 'task-storage', // nome no localStorage
    }
  )
);
``` 