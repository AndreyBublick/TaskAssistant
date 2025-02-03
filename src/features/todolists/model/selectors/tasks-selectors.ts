import { RootState } from "../../../../app/store";

import { TaskItemType } from "../tasks-reducer/tasks-reducer";
import type { TaskType } from "../../api/tasksApi.types";

export const selectorGetTasks = (state: RootState): TaskItemType => state.tasks;
export const selectorGetTaskById = (state: RootState, id: string): TaskType[] => state.tasks[id];
