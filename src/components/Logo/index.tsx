import type React from 'react';
import styles from './styles.module.css';
import { TimerIcon } from 'lucide-react';

export function Logo(){

    return (
    <div className={styles.logo}>
    <a className={styles.LogoLink} href="#" >
            <TimerIcon size= {64}/>
            <span>Chronos Pomodoro</span>
        </a>
    </div>
    );
}