import {ReactNode} from "react";

const layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="bg-indigo-300 min-h-1/3 min-w-1/3 rounded-2xl p-6">
                {children}
            </div>
        </div>
    );
};

export default layout;


