import React from 'react';
import Container from "@/app/components/Container";
import {ModalProps} from "@/app/libs/types";

const Modal = ({closeModal, openModal}: ModalProps) => {
    return (
        <div className={`fixed h-screen w-screen overflow-hidden top-0 left-0 bg-black/30 flex 
        justify-center items-center`}>
            <Container classNames={'rounded-md'}>
                HI
            </Container>
        </div>
    );
};

export default Modal;