import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';

type AvaibleThemes = 'light' | 'dark';

export function Menu() {
    const [theme, setTheme] = useState<AvaibleThemes>(() => {
        const storedTheme = 
         (localStorage.getItem('theme') as AvaibleThemes) || 'dark';

        return storedTheme;
    });
    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    }

    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ){
        event.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
            return nextTheme;
        });

        

    }    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
    <nav className={styles.menu}>
    <a className={styles.MenuLink} href="#" aria-label='Ir para a Home' title='ir para home'>
            <HouseIcon/>
            
        </a>
        <a className={styles.MenuLink} href="#" aria-label='Ir para o Histórico' title='ir para histórico'>
            <HistoryIcon />
            
        </a>
        <a className={styles.MenuLink} href="#" aria-label='Ir para as Configurações' title='ir para configurações'>
            <SettingsIcon />
            
        </a>
        <a className={styles.MenuLink} href="#"
         aria-label='mudar Tema'
         title='mudar tema'
         onClick={handleThemeChange}>
            {nextThemeIcon[theme]}
            
        </a>
    </nav>
    );
}