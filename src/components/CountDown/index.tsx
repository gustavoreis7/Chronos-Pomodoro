import { useTaskContext } from '../../contexts/taskContext/useTaskContext';
import styles from './styles.module.css';


export function Countdown() {
    const { state } = useTaskContext();

    return <div className={styles.container}>{state.formattedTimeRemaining}</div>;
    
}