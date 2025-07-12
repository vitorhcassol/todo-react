import './AddSubtaskForm.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { useState } from 'react';
import type { Subtask } from '../../types/task';

interface AddSubtaskFormProps {
    onClose: () => void;
    onSave: (subtasks: Subtask[]) => void;
    initialSubtasks?: Subtask[];
}

function AddSubtaskForm({ onClose, onSave, initialSubtasks = [] }: AddSubtaskFormProps) {
    const [subtaskInput, setSubtaskInput] = useState('');
    const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);

    const handleAddSubtask = () => {
        if (subtaskInput.trim()) {
            const newSubtask: Subtask = {
                id: Date.now(),
                name: subtaskInput.trim(),
                completed: false
            };
            setSubtasks([...subtasks, newSubtask]);
            setSubtaskInput('');
        }
    };

    const handleRemoveSubtask = (id: number) => {
        setSubtasks(subtasks.filter(subtask => subtask.id !== id));
    };

    const handleSubtaskInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSubtask();
        }
    };

    const handleSave = () => {
        onSave(subtasks);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return(
        <div className="overlay" onClick={handleClose}>
            <div className="add-subtask-form" onClick={(e) => e.stopPropagation()}>
                <div className="add-subtask-form-container">
                    <div className="add-subtask-form-header">
                        <h1>Add Subtask</h1>
                        <div className="add-subtask-form-header-close-button" onClick={handleClose}>
                            <Icon path={mdiClose} size={1} />
                        </div>
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
                    
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="save-button"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSubtaskForm;