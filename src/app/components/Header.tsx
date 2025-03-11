"use client"

import Link from "next/link";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import useAuth from "@/app/context/Auth/useAuth";

const Header = () => {
    const {user} = useAuth();
    return (
        <div className="flex w-full justify-between items-center">
            <Link href={'/'} className="cursor-pointer">
                <Image src="/LetsPlanLogo.svg" alt="logo" width={200} height={50}/>
            </Link>
            <Link href={user ? '/dashboard' : '/sign-in'}>

                <PersonIcon className="h-8 w-8 text-[#4F46E5] hover:scale-110" fontSize="large"/>
                {/*    <button className="bg-indigo-500/20 p-1.5 rounded-xl text-black transform duration-500 ease-out backdrop-blur-md*/}
                {/*border border-white/30 shadow-lg hover:scale-110 hover:bg-white/30 cursor-pointer">*/}
                {/*        Login*/}
                {/*    </button>*/}

            </Link>

        </div>
    );
};

export default Header;
