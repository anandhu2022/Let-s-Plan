"use client";

import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import Container from "@/app/components/Container";
import {DarkMode, LightMode} from "@mui/icons-material";
import useTheme from "@/app/context/Theme/useTheme";
import useAuth from "@/app/context/Auth/useAuth";

const Header = () => {
    const {toggleTheme, darkMode} = useTheme();
    const {logout} = useAuth();
    return (
        <div className={`w-full`}>
            <Container>
                <div className={`flex justify-between items-center`}>
                    <div className={`cursor-pointer`}>
                        <MenuOpenSharpIcon fontSize={"large"}/>
                    </div>
                    <div className={`flex flex-row justify-center items-center gap-3`}>
                        <div className={`p-2.5 rounded-full flex transition duration-300 
            ease-out cursor-pointer ${darkMode ? "text-gray-600 hover:text-gray-400 hover:bg-gray-700" :
                            "text-gray-400 hover:text-gray-700 hover:bg-gray-300"}`}
                             onClick={toggleTheme}>
                            {darkMode ? <DarkMode fontSize={"medium"}/> : <LightMode fontSize={"medium"}/>}
                        </div>
                        <div className={`dropdown dropdown-bottom dropdown-end`}>
                            <div tabIndex={0} role="button" className={`w-9 h-9 rounded-full ${darkMode ?
                                "text-black bg-[#ffffff]" : "text-white bg-black"} text-md flex justify-center 
                                items-center cursor-pointer`}>
                                RS
                            </div>
                            <ul tabIndex={0}
                                className={`dropdown-content menu ${darkMode ? "bg-[#1e293b] text-[#64747a]" :
                                    "bg-white text-[#4e5c59] shadow-2xl"} rounded-box z-1 w-52 p-2 shadow-md`}>
                                <li><span>View Profile</span></li>
                                <li onClick={() => logout()}><span>Sign Out</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
