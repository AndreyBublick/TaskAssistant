import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

/*[key: string]: any;*/
export type ActionType =removeTodoListACType|addTodoListACType|changeTodolistTitleACType|changeTodolistFilterACType;

type removeTodoListACType = {
    type: typeof REMOVE_TODOLIST,
    id: string,
};
type addTodoListACType = {
    type: typeof ADD_TODOLIST,
    title: string,
};
type changeTodolistTitleACType = {
    type: typeof CHANGE_TODOLIST_TITLE,
    payload: {id:string,title:string},
};
type changeTodolistFilterACType = {
    type: typeof CHANGE_TODOLIST_FILTER,
    payload: {id:string,filter:FilterValuesType},
};



export const todoListsReduce = (state: TodoListType[], action: ActionType): TodoListType[] => {

    switch (action.type) {
        case REMOVE_TODOLIST: {

            return state.filter(td => td.id !== action.id);
        }
        case ADD_TODOLIST: {
            return [...state, {id: v1(), title: action.title, filter: 'all'}];
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(td => td.id === action.payload.id ? {...td, title: action.payload.title} : td);

        }
        case CHANGE_TODOLIST_FILTER: {

            return state.map(td => td.id === action.payload.id ? {...td, filter: action.payload.filter} : td);

        }

        default: {
            return state
        }
    }

};

export const removeTodoListAC = (id:string):removeTodoListACType=> ({
    type:REMOVE_TODOLIST,
    id,
} as const);
export const addTodoListAC = (title:string):addTodoListACType=> ({
    type:ADD_TODOLIST,
   title,
} as const);
export const changeTodolistTitleAC = (id:string,title:string):changeTodolistTitleACType=> ({
    type:CHANGE_TODOLIST_TITLE,
    payload:{id,title},
} as const);
export const changeTodolistFilterAC = (id:string,filter:FilterValuesType):changeTodolistFilterACType=> ({
    type:CHANGE_TODOLIST_FILTER,
    payload:{id,filter},
} as const);