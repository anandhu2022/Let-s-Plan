import Container from "@/app/components/Container";
import {ReactNode} from "react";


const ModalContainer = ({children, className, containerWidth}: {
    children: ReactNode,
    className?: string,
    containerWidth?: string
}) => {
    return (
        <div
            className={`fixed bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center z-10 ${className}`}>
            <Container className={`rounded-md flex flex-col gap-5 p-6 ${containerWidth}`}>
                {children}
            </Container>
        </div>
    );
};

export default ModalContainer;