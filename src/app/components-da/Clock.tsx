"use client";

import {useState, useEffect} from "react";
import useTheme from "@/app/context/Theme/useTheme";

const Clock = () => {
    const [ctime, setTime] = useState("");
    const {darkMode} = useTheme();

    useEffect(() => {
        const updateClock = () => {
            setTime(new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }));
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className={`${darkMode ? "bg-black/40 text-white" : "bg-white/40 text-black"} backdrop-blur-sm shadow-lg 
        rounded-xl p-3 border-t-4 border-indigo-600 sm:text-3xl h-fit`}>
            {ctime || "Loading..."}
        </h1>
    );
};

export default Clock;
