import { mdiCalendarMonthOutline, mdiTimerOutline, mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import type { Task } from '../../types/task';

import AddSubtaskForm from '../addSubtaskForm/AddSubtaskForm';

import './TaskCard.css';

function TaskCard({ task }: { task: Task }) {
    const { toggleTask, toggleSubtask, deleteTask } = useTaskStore();
    const [isAddSubtaskModalOpen, setIsAddSubtaskModalOpen] = useState(false);

    const handleTaskToggle = () => {
        toggleTask(task.id);
    };

    const handleSubtaskToggle = (subtaskId: number) => {
        toggleSubtask(task.id, subtaskId);
    };

    const handleAddSubtask = () => {
        setIsAddSubtaskModalOpen(true);
    };

    const handleTaskActions = () => {
        deleteTask(task.id);
    };

    return (
        <li key={task.id} className="task-list-item">
            <div className="task-list-item-content">
                <div className="task-list-item-content-left">
                    <div className="task-list-item-checkbox">
                        <input
                            type="checkbox"
                            className="task-list-item-checkbox-input"
                            checked={task.completed}
                            onChange={handleTaskToggle}
                        />
                    </div>
                    <div className="task-list-item-date-hour-container">
                        <div className="task-list-item-date-hour">
                            <span className="task-list-item-date-hour-item">
                                <Icon path={mdiCalendarMonthOutline} size={0.8} />
                                <p>{task.date}</p>
                            </span>
                            {task.time && task.time.trim() !== '' && (
                                <span className="task-list-item-date-hour-item">
                                    <Icon path={mdiTimerOutline} size={0.8} />
                                    <p>{task.time}</p>
                                </span>
                            )}
                        </div>
                        <div className="task-list-item-name">
                            {task.name}
                        </div>
                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="task-list-item-subtasks">
                                {task.subtasks.map((subtask) => (
                                    <div key={subtask.id} className="task-list-item-subtask">
                                        <input 
                                            type="checkbox" 
                                            className="task-list-item-subtask-input" 
                                            checked={subtask.completed}
                                            onChange={() => handleSubtaskToggle(subtask.id)}
                                        />
                                        <p>{subtask.name}</p>
                                    </div>
                                ))}
                                <button onClick={handleAddSubtask} className="task-list-item-subtask-button">
                                    <Icon path={mdiPlus} size={0.6} />
                                    Add Sub-Task
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="task-list-item-content-right">
                    <div onClick={handleTaskActions} className="task-list-item-actions">
                        <Icon path={mdiTrashCanOutline} size={0.8} />
                    </div>
                </div>
            </div>
            {isAddSubtaskModalOpen && (
                <AddSubtaskForm onSubtaskAdded={() => setIsAddSubtaskModalOpen(false)} />
            )}
        </li>
    )
}

export default TaskCard;