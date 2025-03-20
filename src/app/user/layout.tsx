import {ReactNode} from "react";
import Sidebar from "@/app/components/Sidebar";
import BackgroundImage from "@/app/components/backgroundImage";

const layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex p-3 h-[90%] flex-row">
            <BackgroundImage/>
            <Sidebar/>
            <main className="sm:px-8 w-full">
                <div className="w-full h-full rounded-2xl">
                    {children}
                </div>

            </main>
        </div>
    );
};

export default layout;
