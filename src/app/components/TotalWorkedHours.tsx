import {useEffect, useState} from "react";
import useAuth from "@/app/context/Auth/useAuth";
import useTask from "@/app/context/Task/useTask";
import useTheme from "@/app/context/Theme/useTheme";

const TotalWorkedHours = () => {
    const {user} = useAuth();
    const {darkMode} = useTheme();
    const {reloadViewTaskForm} = useTask();
    const [time, setTime] = useState<number | null>(null);
    useEffect(() => {
        if (user?.id) {
            fetch(`api/task/get-time?userId=${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    setTime(data.totalTime);
                })
        }
    }, [reloadViewTaskForm, user?.id]);
    if (!user?.id) return;
    return (
        <div className={`${darkMode ? "bg-black/50" : "bg-white/50"} backdrop-blur-md shadow-lg rounded-xl p-3 
        border-t-4 border-red-500 text-center flex flex-row items-center`}>
            <h3 className={`${darkMode ? "text-white" : "text-black"} font-semibold text-gray-900`}>Total Hrs logged
                today: &nbsp;</h3>
            <p className={darkMode ? "text-white" : "text-black"}>{user?.id ? time != null ? time + " hour(s)"
                : "loading" : "Please Login"}</p>
        </div>
    );
};

export default TotalWorkedHours;
