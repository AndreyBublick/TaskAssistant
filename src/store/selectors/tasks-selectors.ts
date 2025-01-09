import {RootStateType} from "../store";

import {TaskItemType} from "../task-reducer/task-reducer";
import {TaskType} from "../../App";

export const selectorGetTasks = (state:RootStateType):TaskItemType => state.tasks;
export const selectorGetTaskById = (state:RootStateType,id:string):TaskType[] => state.tasks[id];