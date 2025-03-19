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
    return (
        <>
            <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold sm:text-sm text-gray-900`}>
                Total Hrs logged today: &nbsp;</h3>
            <p className={`${darkMode ? "text-white" : "text-black"} text-2xl sm:text-sm font-bold sm:font-normal`}>
                {user?.id ? time != null ? time + " hour(s)" : "loading" : "Please Login"}
            </p>
        </>
    )
        ;
};

export default TotalWorkedHours;
