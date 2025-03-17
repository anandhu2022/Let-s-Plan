import React, {useState} from 'react';
import {ContextProviderProps} from "@/app/libs/types";
import {TaskContext} from "@/app/context/Task/useTask";

const TaskProvider = ({children}: ContextProviderProps) => {
    const [reloadViewTaskForm, setReloadViewTaskForm] = useState<boolean>(false);
    const reloadTaskForm = () => {
        setReloadViewTaskForm(!reloadViewTaskForm);
    }
    return (
        <TaskContext.Provider value={{reloadViewTaskForm, reloadTaskForm}}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;