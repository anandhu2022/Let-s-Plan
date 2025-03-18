import {ReactNode} from "react";

const layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="w-full h-full bg-white/40 backdrop-blur-sm rounded-2xl">
            {children}
        </div>
    );
};

export default layout;
