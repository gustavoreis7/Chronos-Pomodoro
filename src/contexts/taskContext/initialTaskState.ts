import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
    tasks: [],
    formattedTimeRemaining: '00:00',
    secondsRemaining: 0,
    activeTask: null,
    currentCycle: 0,
    config: {
        work: 1,
        shortBreak: 1,
        longBreak: 1,

    },
};