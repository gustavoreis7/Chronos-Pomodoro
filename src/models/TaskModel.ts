import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
    id: string;
    name: string;
    duration: number;
    startedate: number;
    completedate?: number | null;
    interrupteddate?: number | null;
    type: keyof TaskStateModel['config'];

};