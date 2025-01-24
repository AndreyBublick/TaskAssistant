import {RootStateType} from "../../../../app/store";

import {TodoListDomainType} from "../todolist-reducer/todolists-reducer";


export const selectorGetTodoLists = (state:RootStateType):TodoListDomainType[] => state.todoLists;