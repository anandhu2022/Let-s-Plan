"use client";

import {useState, useEffect} from "react";

const Clock = () => {
    const [ctime, setTime] = useState("");

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
        <h1 className="bg-white/40 backdrop-blur-sm shadow-lg rounded-xl p-3 border-t-4 border-indigo-600 text-3xl h-fit">
            {ctime || "Loading..."}
        </h1>
    );
};

export default Clock;
