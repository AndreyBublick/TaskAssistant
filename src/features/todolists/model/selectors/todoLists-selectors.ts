import {RootStateType} from "../../../../app/store";
import {TodoListType} from "../../../../app/App";


export const selectorGetTodoLists = (state:RootStateType):TodoListType[] => state.todoLists;