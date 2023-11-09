import React, { createContext, useContext, ReactNode, useState } from 'react';

interface TaskContextProps {
    taskItems: TaskProp[];
    setTaskItems: React.Dispatch<React.SetStateAction<TaskProp[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskItems, setTaskItems] = useState<TaskProp[]>([]);

    return (
        <TaskContext.Provider value={{ taskItems, setTaskItems }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider')
    }
    return context
}