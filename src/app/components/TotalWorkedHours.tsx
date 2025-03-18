import {useEffect, useState} from "react";
import useAuth from "@/app/context/Auth/useAuth";
import useTask from "@/app/context/Task/useTask";

const TotalWorkedHours = () => {
    const {user} = useAuth();
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
        <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-3 border-t-4 border-red-500 text-center
        flex flex-row items-center">
            <h3 className="font-semibold text-gray-900">Total Hrs logged today: &nbsp;</h3>
            <p className="text-gray-600">{user?.id ? time != null ? time + " hour(s)" : "loading" : "Please Login"}</p>
        </div>
    );
};

export default TotalWorkedHours;
