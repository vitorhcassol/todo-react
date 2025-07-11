import TaskCard from '../taskCard/TaskCard';
import { useTaskStore } from '../../stores/taskStore';

import './TaskList.css';

function TaskList() {
    const { getTasksByDate } = useTaskStore();
    const todayTasks = getTasksByDate("Today");

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h1>Today's Task</h1>
            </div>
            <div className="task-list-body">
                <ul className="task-list-items">
                    {todayTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TaskList;