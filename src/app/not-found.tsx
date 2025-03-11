import Link from 'next/link'
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="w-full h-full flex justify-evenly items-center flex-row">
            <Image src="/no-route.png" alt=""  height={200} width={400}/>
            <div className="flex flex-col text-red-700 gap-6">
                <div className="text-9xl font-bold">404</div>
                <div>The page requested was not found</div>
                <Link href="/" className="p-3 bg-black text-center rounded-xl text-white font-bold transition
                duration-500 ease-out hover:bg-blue-900">Return Home</Link>
            </div>
        </div>
    )
}