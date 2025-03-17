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
        <h1 className="absolute right-10 top-1/10 bg-white shadow-lg rounded-xl p-4 border-t-4
        border-indigo-600 flex flex-col items-center text-center text-3xl">
            {ctime || "Loading..."}
        </h1>
    );
};

export default Clock;
