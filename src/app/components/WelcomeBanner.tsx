import React, {useEffect, useState} from 'react';
import useTheme from "@/app/context/Theme/useTheme";
import WelcomeBannerCards from "@/app/components/WelcomeBannerCards";
import useAuth from "@/app/context/Auth/useAuth";

const WelcomeBanner = () => {
    const {user} = useAuth();
    const {darkMode} = useTheme();
    const [dailyQuote, setDailyQuote] = useState<{ quote: string; author?: string }>({
        quote: "",
        author: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch("https://dummyjson.com/quotes/random");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setDailyQuote({quote: data.quote, author: data.author || "Unknown"});

                setTimeout(() => setLoading(false), 500);
            } catch (error) {
                console.error("Error fetching daily quote:", error);
                setDailyQuote({
                    quote: "If Your Eyes Are Opened, You'll See The Things Worth Seeing.",
                    author: "Anonymous",
                });

                setTimeout(() => setLoading(false), 200);
            }
        };

        fetchQuote();
    }, []);
    return (
        <div
            className={`w-full bg-[#624bff] pb-20 relative ${darkMode ? "text-black" : "text-white"}`}
        >
            <div className={`flex flex-col gap-3 transition-all duration-500 p-6`}>
                <div className="flex flex-row items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-full bg-[#ffffff] text-black text-3xl flex justify-center items-center">
                        RS
                    </div>
                    <h2 className="text-3xl">Good Morning, {user?.username}!</h2>
                </div>

                <div className="w-full min-h-[60px] flex flex-col justify-center">
                    {loading ? (
                        <div className="flex flex-col gap-2 transition-opacity duration-500 opacity-100">
                            <div className={`skeleton h-5 w-3/4 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                            <div
                                className={`skeleton h-4 w-1/4 self-end ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>
                        </div>
                    ) : (
                        <div className="transition-opacity duration-500 opacity-100 flex flex-col justify-center">
                            <blockquote className="text-lg italic">{dailyQuote.quote}</blockquote>
                            {dailyQuote.author && (
                                <p className="mt-2 text-sm font-medium text-right">- {dailyQuote.author}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <WelcomeBannerCards/>
        </div>
    );
};

export default WelcomeBanner;