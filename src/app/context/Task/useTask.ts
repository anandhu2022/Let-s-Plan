"use client";

import {TaskContextProps} from "../../libs/types";
import {createContext, useContext} from "react";

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTask = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within an TaskProvider");
    }
    return context;
}
export default useTask;