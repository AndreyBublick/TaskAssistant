import {RootStateType} from "../../../../app/store";

import {TaskItemType, TaskDomainType} from "../task-reducer/task-reducer";

export const selectorGetTasks = (state:RootStateType):TaskItemType => state.tasks;
export const selectorGetTaskById = (state:RootStateType,id:string):TaskDomainType[] => state.tasks[id];