import {RootStateType} from "../../../../app/store";

import {TaskItemType} from "../task-reducer/task-reducer";
import {TaskType} from "../../../../app/App";

export const selectorGetTasks = (state:RootStateType):TaskItemType => state.tasks;
export const selectorGetTaskById = (state:RootStateType,id:string):TaskType[] => state.tasks[id];