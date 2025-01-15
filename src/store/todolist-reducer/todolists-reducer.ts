import {FilterValuesType, TodoListType} from "../../app/App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';








const initialState:TodoListType[] = [


];




export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {

    switch (action.type) {
        case REMOVE_TODOLIST: {

            return state.filter(td => td.id !== action.id);
        }
        case ADD_TODOLIST: {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}];
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(td => td.id === action.payload.id ? {...td, title: action.payload.title} : td);

        }
        case CHANGE_TODOLIST_FILTER: {

            return state.map(td => td.id === action.payload.idTodoLists ? {...td, filter: action.payload.filter} : td);

        }


        default: {
            return state
        }
    }

};











export const removeTodoListAC = (id:string)=> ({
    type:REMOVE_TODOLIST,
    id,
} as const);
export const addTodoListAC = (title:string)=> ({
    type:ADD_TODOLIST,
    payload:{
        id:v1(),
        title,
    },

} as const);

export const changeTodolistTitleAC = (id:string,title:string)=> ({
    type:CHANGE_TODOLIST_TITLE,
    payload:{id,title},
} as const);

export const changeTodolistFilterAC = (payload:{idTodoLists:string,filter:FilterValuesType})=> ({
    type:CHANGE_TODOLIST_FILTER,
    payload,
} as const);


export type ActionType = RemoveTodoListACType | AddTodoListACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType;


export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type AddTodoListACType =ReturnType<typeof addTodoListAC>;
type ChangeTodolistTitleACType =ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterACType =ReturnType<typeof changeTodolistFilterAC>;




