import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import type { Subtask } from '../../types/task';
import './AddTaskForm.css';

interface AddTaskFormProps {
    onTaskAdded?: () => void;
}

function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
    const { addTask } = useTaskStore();
    const [formData, setFormData] = useState({
        name: '',
        date: 'Today',
        time: '',
        completed: false
    });
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [subtaskInput, setSubtaskInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name.trim()) {
            addTask({
                ...formData,
                subtasks: subtasks.length > 0 ? subtasks : undefined
            });
            setFormData({
                name: '',
                date: 'Today',
                time: '',
                completed: false
            });
            setSubtasks([]);
            setSubtaskInput('');
            onTaskAdded?.();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubtask = () => {
        if (subtaskInput.trim()) {
            const newSubtask: Subtask = {
                id: Date.now(),
                name: subtaskInput.trim(),
                completed: false
            };
            setSubtasks(prev => [...prev, newSubtask]);
            setSubtaskInput('');
        }
    };

    const handleRemoveSubtask = (id: number) => {
        setSubtasks(prev => prev.filter(subtask => subtask.id !== id));
    };

    const handleSubtaskInputKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSubtask();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <h3>Add New Task</h3>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Task name"
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <select
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Yesterday">Yesterday</option>
                </select>
            </div>
            <div className="form-group">
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Subtasks (optional)</label>
                <div className="subtask-input-container">
                    <input
                        type="text"
                        value={subtaskInput}
                        onChange={(e) => setSubtaskInput(e.target.value)}
                        onKeyPress={handleSubtaskInputKeyPress}
                        placeholder="Add a subtask"
                        className="form-input subtask-input"
                    />
                    <button
                        type="button"
                        onClick={handleAddSubtask}
                        className="add-subtask-button"
                        disabled={!subtaskInput.trim()}
                    >
                        +
                    </button>
                </div>
                
                {subtasks.length > 0 && (
                    <div className="subtasks-list">
                        {subtasks.map((subtask) => (
                            <div key={subtask.id} className="subtask-item">
                                <span className="subtask-name">{subtask.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubtask(subtask.id)}
                                    className="remove-subtask-button"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button type="submit" className="form-button">
                Add Task
            </button>
        </form>
    );
}

export default AddTaskForm; 