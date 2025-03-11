import Card from "@/app/components/Card";

const page = () => {
    return (
        <div className="bg-cover bg-center h-screen w-full bg-[url('/banner.png')]">
            {/*<img src="/banner.png" alt="banner-image" className="w-full relative"/>*/}
            <Card/>
        </div>

    );
};

export default page;
