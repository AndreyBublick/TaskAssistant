import { RootStateType } from "../../../../app/store";

import { TaskItemType, TaskDomainType } from "../tasks-reducer/tasks-reducer";

export const selectorGetTasks = (state: RootStateType): TaskItemType => state.tasks;
export const selectorGetTaskById = (state: RootStateType, id: string): TaskDomainType[] => state.tasks[id];
