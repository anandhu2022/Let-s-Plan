"use client";

import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import {useRouter} from "next/navigation";
import useAuth from "@/app/context/Auth/useAuth";
import TotalWorkedHours from "@/app/components/TotalWorkedHours";

const Header = () => {
    const {user, logout} = useAuth();
    const router = useRouter();

    return (
        <div className="flex w-full justify-between items-center">
            <Link href="/" className="cursor-pointer">
                <Image src="/LetsPlanLogo.svg" alt="logo" width={200} height={50}/>
            </Link>
            <TotalWorkedHours/>
            <button
                onClick={() => {
                    if (user) logout();
                    router.push("/sign-in");
                }}
                className="bg-indigo-500/20 p-1.5 rounded-xl text-black transform
                    duration-500 ease-out backdrop-blur-md border border-white/30 shadow-lg
                    hover:scale-110 hover:bg-white/30 cursor-pointer flex justify-center items-center"
            >
                <PersonIcon className="mr-2"/>
                {user ? "Logout" : "Login"}
            </button>
        </div>
    );
};

export default Header;
