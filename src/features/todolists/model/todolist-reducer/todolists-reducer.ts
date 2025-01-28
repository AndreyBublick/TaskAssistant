import {todolistsApi, TodolistType} from "../api/todolists-api";
import {AppDispatch} from "../../../../app/store";
import {Dispatch} from "redux";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';
export const SET_TODOLISTS = 'SET_TODOLISTS';

export type FilterValuesType = "all" | "active" | "completed" | 'three';


export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType,
};

const initialState: TodoListDomainType[] = [];


export const todolistsReducer = (state: TodoListDomainType[] = initialState, action: ActionType): TodoListDomainType[] => {

    switch (action.type) {
        case SET_TODOLISTS: {

            return action.payload.todoLists.map(td => ({...td, filter: 'all'}));


        }
        case REMOVE_TODOLIST: {

            return state.filter(td => td.id !== action.payload.id);
        }
        case ADD_TODOLIST: {

            return [...state, {...action.payload.todoList, filter: 'all'}];

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


export const removeTodoListAC = (id: string) => ({
    type: REMOVE_TODOLIST,
    payload: {id},
} as const);

export const addTodoListAC = (todoList: TodolistType) => ({
    type: ADD_TODOLIST,
    payload: {
        todoList,
    },

} as const);

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => ({
    type: CHANGE_TODOLIST_TITLE,
    payload: payload,
} as const);

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValuesType }) => ({
    type: CHANGE_TODOLIST_FILTER,
    payload,
} as const);

export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({
    type: SET_TODOLISTS,
    payload: {
        todoLists,
    },
} as const);


export const getTodoListsTC = () => {

    return async (dispatch: AppDispatch) => {

        try {
            await todolistsApi.getTodolists().then(response => dispatch(setTodoListsAC(response.data)));
        } catch (error) {
            alert(error);
        }


    }
};

export const removeTodolistTC = (id: string) => {
    return async (dispatch: Dispatch) => {

        try {
            await todolistsApi.deleteTodolist(id).then(() => {
                dispatch(removeTodoListAC(id));
            });
        } catch (error) {
            alert(error);
        }


    };
};

export const createTodolistTC = (title: string) => {


    return async (dispatch: Dispatch) => {


        try {
            await todolistsApi.postTodolist(title).then(response => {
                dispatch(addTodoListAC(response.data.data.item));
            });


        } catch (error) {
            alert(error)
        }

    };


};

export const changeTodolistTitleTC = (payload: { id: string, title: string }) => {

    return async (dispatch: Dispatch) => {
        try {
            await todolistsApi.changeTodolistTitle(payload).then(() => {
                dispatch(changeTodolistTitleAC(payload));
            });
        } catch (error) {
            alert(error);
        }

    };
};


export type ActionType =
    RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodoListsType;


export type SetTodoListsType = ReturnType<typeof setTodoListsAC>;
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type AddTodoListACType = ReturnType<typeof addTodoListAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;




