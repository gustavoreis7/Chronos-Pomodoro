import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaulInput";
import { DefaultButton } from "../DefaultButton";
import { useRef} from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/taskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/taskContext/taskActions";
import { Tips } from "../Tips";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";


export function MainForm() {
    const {state, dispatch} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    //ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);
   

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current == null) return;
        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert("Please enter a task name.");
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startedate: Date.now(),
            interrupteddate: null,
            completedate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        }

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

        const worker = TimerWorkerManager.getInstance();
        worker.onmessage((event) => {
            console.log("Message received from worker:", event.data);
        });

  }
    function handleInterruptTask() {
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
        // setState(prevState => {
        //     return {
        //         ...prevState,
        //         activeTask: null,
        //         secondsRemaining: 0,
        //         formattedTimeRemaining: "00:00",
        //         tasks: prevState.tasks.map(task => {
        //             if (prevState.activeTask.id === task.id) {
        //                 return {...task, interrupteddate: Date.now() };
        //             }
        //             return task;
        //         })

        //     }
        // });
    }




     return (
        <form onSubmit={handleCreateNewTask} className="form">

            <div className="formRow">
                <DefaultInput
                    labelText="Task"
                    id="taskInput"
                    type="text"
                    placeholder="Enter your task"
                    ref={taskNameInput} 
                    disabled={!!state.activeTask}
                />
            </div>
            <div className="formRow">
                <Tips />

            </div>


            {state.currentCycle > 0 && (
                <div className="formrow">
                    <Cycles />
                </div>
            )}

            <div className="formRow">
                {!state.activeTask &&(
                    <DefaultButton 
                        aria-label="Iniciar nova tarefa"
                        type="submit" 
                        icon={<PlayCircleIcon />}
                        key= "botao_submit" />

                )}
                  {!!state.activeTask && (
                    <DefaultButton 
                        aria-label="Interromper tarefa"
                        title="Interromper tarefa"
                        type="button" 
                        color="red"
                        icon={<StopCircleIcon />} 
                        onClick={handleInterruptTask}
                        key="botao_button"
                    />
                )}
            </div>
        </form>
    )
}