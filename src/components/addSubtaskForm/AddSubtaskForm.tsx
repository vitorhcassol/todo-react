import './AddSubtaskForm.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

function AddSubtaskForm() {
    return(
        <div className="overlay">
            <div className="add-subtask-form">
                <div className="add-subtask-form-container">
                    <div className="add-subtask-form-header">
                        <h1>Add Subtask</h1>
                        <div className="add-subtask-form-header-close-button">
                            <Icon path={mdiClose} size={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSubtaskForm;