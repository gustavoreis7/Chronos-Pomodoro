import { useTaskContext } from "../../contexts/taskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips(){
    const {state} = useTaskContext();
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

     //tips
    const tipsForWhenNoActiveTask = {
        work: <span>Próximo ciclo é de {state.config.work} minutos</span>,
        shortBreak: <span>Próximo descanso é de {state.config.shortBreak} minutos</span>,
        longBreak: <span>Próximo descanso será longo {state.config.longBreak} minutos</span>,
    };
    const tipsForWhenActiveTask = {
        work: <span>foque por {state.config.work} minutos</span>,
        shortBreak: <span>descanse por {state.config.shortBreak} minutos</span>,
        longBreak: <span>descanso longo {state.config.longBreak} minutos</span>,
    };


    return(
        <>

        {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
                {!state.activeTask && tipsForWhenNoActiveTask[nextCycleType]}
        
        
        </>
    )
}