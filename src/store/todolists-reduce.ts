import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string;
    [key: string]: any;
};

export const todoListsReduce = (state: TodoListType[], action: ActionType): TodoListType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td=>td.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [...state,{id:v1(),title:action.title, filter:'all'}];
        }


        case 'CHANGE-TODOLIST-TITLE': {
            if(state.find(td=>td.id === action.payload.id)){
                return state.map(td=>td.id===action.payload.id ? {...td, title:action.payload.title} :td);
            }
        }
        case 'CHANGE-TODOLIST-FILTER': {
            if(state.find(td=>td.id === action.payload.id)){
                return state.map(td=>td.id===action.payload.id ? {...td, filter:action.payload.filter} :td);
            }
        }

        default: {
            return state
        }
    }

};