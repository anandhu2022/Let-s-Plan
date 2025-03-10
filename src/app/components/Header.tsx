import Link from "next/link";

const Header = () => {
    return (
        <div className="flex w-full justify-between items-center">
            <Link href={'/'} className="cursor-pointer">
                <div>Header</div>
            </Link>
            <Link href={'/signin'}>
                <button className="bg-indigo-500 p-1.5 rounded-xl text-white transform duration-500 ease-out
            hover:scale-115 cursor-pointer">
                    Login
                </button>
            </Link>

        </div>
    );
};

export default Header;
