import { useEffect, useRef } from "react";

const Modal = ({ isOpen, setIsOpen, title, children }) => {
    const dialogRef = useRef();
    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);
    return (
        <dialog ref={dialogRef}>
            <button onClick={() => setIsOpen(false)}>x</button>
            <h1>{title}</h1>
            <div>{children}</div>
        </dialog>
    );
};
export default Modal;
