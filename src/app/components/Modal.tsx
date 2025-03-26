import Container from "@/app/components/Container";
import Button from "@/app/components/form/Button";
import {ModalProps} from "@/app/libs/types";
import {FC} from "react";


const Modal: FC<ModalProps> = ({isOpen, message, success = false, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center z-10">
            <Container className={`rounded-md flex flex-col gap-8 max-w-sm text-center p-6
                ${success ? "text-green-500" : "text-red-500"}`}>
                <p>{message}</p>
                <div className="w-full" onClick={onClose}>
                    <Button label="Close"/>
                </div>
            </Container>
        </div>
    );
};

export default Modal;