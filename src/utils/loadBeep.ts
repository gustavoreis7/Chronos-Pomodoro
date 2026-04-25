import gratationalBeep from '../assets/audios/gravitational_beep_fixed.mp3';


export function loadBeep(){
    const audio = new Audio(gratationalBeep);
    audio.load();
    return () => {
        audio.currentTime = 0;
        audio.play().catch(error => console.error("Error playing audio:", error));
    }

}