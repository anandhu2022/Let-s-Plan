import {ReactNode} from "react";

const layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="w-full h-full rounded-2xl">
            {children}
        </div>
    );
};

export default layout;
