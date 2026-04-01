import styles from './styles.module.css';


export function Footer() {
    return (
        <footer className={styles.footer}> 
            <a href="">Entenda como funciona a pratica promodoro</a>
            <a href="">Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤️</a>
        </footer>
    )
}
