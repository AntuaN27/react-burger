import React from "react";
import styles from './modal-overlay.module.css';

interface IModalOverlay {
    onClick: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({ onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick}></div>
    )
}

export default ModalOverlay;