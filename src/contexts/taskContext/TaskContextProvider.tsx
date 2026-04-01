import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);
    const playbeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
   
    const worker = TimerWorkerManager.getInstance();

    worker.onmessage((event) => {
        const countDownSeconds = event.data;


        if(countDownSeconds <= 0) {
            if (playbeepRef.current) {
                playbeepRef.current();
                playbeepRef.current = null; // Reset the ref after playing the beep
            }
            dispatch({
                type: TaskActionTypes.COMPLETE_TASK,
            });
            
        } else {
            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        }

    
    
});

    useEffect(() => {
        if (!state.activeTask) {
            worker.terminate();
        }
       worker.postMessage(state);
    }, [worker, state])

    useEffect(() => {
        if (state.activeTask && playbeepRef.current == null) {
            console.log("Loading beep sound...");
            playbeepRef.current = loadBeep();
        } else {
            playbeepRef.current = null; // Reset the ref if there's no active task
        } 
      }, [state.activeTask]);

    return (
         <TaskContext.Provider value={{ state, dispatch }}>
              {children}
         </TaskContext.Provider> 
)};
