import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, title, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
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
                        <p className="text text_type_main-large">
                            {title}
                        </p>
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