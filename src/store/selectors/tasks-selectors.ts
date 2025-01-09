import {RootStateType} from "../store";

import {TaskItemType} from "../task-reducer/task-reducer";

export const selectorGetTasks = (state:RootStateType):TaskItemType => state.tasks;