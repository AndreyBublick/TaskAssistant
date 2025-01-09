import {RootStateType} from "../store";
import {TodoListType} from "../../App";


export const selectorGetTodoLists = (state:RootStateType):TodoListType[] => state.todoLists;