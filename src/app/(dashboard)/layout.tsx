import {ReactNode} from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const Page = ({children}:{children:ReactNode}) => {
    return (
        <div className={`w-screen h-screen overflow-x-hidden`}>
            <div className={`flex flex-row h-full w-full`}>
                <div className={`flex h-full w-1/6`}>
                    <Sidebar/>
                </div>
                <div className={`flex flex-col h-full w-5/6`}>
                    <div className={`flex w-full`}>
                        <Header/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
