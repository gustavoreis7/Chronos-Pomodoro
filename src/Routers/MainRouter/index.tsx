import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { NotFound } from "../../pages/NotFound";

export function MainRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/about-pomodoro" element={<AboutPomodoro />} />  
            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>

    );
}