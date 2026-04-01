import { useTaskContext } from '../../contexts/taskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
    const {state } = useTaskContext();

    const cycleStep = Array.from({ length: state.currentCycle});

    const cycleDescriptionMap = {
        work: 'Ciclo de foco',
        shortBreak: 'Ciclo de descanso curto',
        longBreak: 'Ciclo de descanso longo',
    }
    return (
        <div className={styles.cycles}>
            <span>Ciclos</span>

            <div className={styles.cyclesDots}>
                {cycleStep.map((_, index) => {
                    const nextCycle =  getNextCycle(index);
                    const nextCycleType = getNextCycleType(nextCycle);
                    return( <span
                    key={nextCycle}  
                    className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
                    aria-Label={cycleDescriptionMap[nextCycleType]}
                    title={cycleDescriptionMap[nextCycleType]}></span>);
                        
                         
                })}
                
                
            </div>
        </div>
    );
}