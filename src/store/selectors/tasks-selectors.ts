import {RootStateType} from "../store";
import {TodoListType} from "../../App";
import {TaskItemType} from "../task-reducer/task-reducer";

export const selectorGetTasks = (state:RootStateType):TaskItemType => state.tasks;