import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

interface IModal {
    children: React.ReactNode;
    title: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<IModal> = ({ children, title, onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClick={onClose} />
                <div className={styles.modal}>
                    <div className={styles.modal_header}>
                        {title}
                        <button className={styles.close_btn} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    {children}
                </div>
            </>
        ), modalRoot
    )
}

export default Modal