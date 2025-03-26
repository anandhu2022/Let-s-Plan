import {ReactNode} from "react";

const Page = ({children}: { children: ReactNode }) => {
    return (
        <div className={`p-4 h-full`}>
            {children}
        </div>
    );
};

export default Page;
