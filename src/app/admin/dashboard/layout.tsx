import {ReactNode} from "react";
import Header from "@/app/admin/components/Header";
import Sidebar from "@/app/admin/components/Sidebar";

const Page = ({children}:{children:ReactNode}) => {
    return (
        <div className={`w-screen h-screen`}>
            <div className={`flex flex-row h-full`}>
                <div className={`h-full`}>
                    <Sidebar/>
                </div>
                <div className={`flex flex-col w-full h-full`}>
                    <div>
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
