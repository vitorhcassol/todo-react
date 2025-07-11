import { useState } from 'react';
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import AddTaskForm from "../addTaskForm/AddTaskForm";

import './FabButton.css';

function FabButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFabClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="fab-button" onClick={handleFabClick}>
                <Icon path={mdiPlus} size={1.2} />
            </div>
            
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>
                            ×
                        </button>
                        <AddTaskForm onTaskAdded={handleCloseModal} />
                    </div>
                </div>
            )}
        </>
    )
}

export default FabButton;