import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';
export const ADD_TODOLIST_AND_TASKS = 'ADD-TODOLIST-AND-TASKS';
/*[key: string]: any;*/





export type ActionType =RemoveTodoListACType|AddTodoListACType|ChangeTodolistTitleACType|ChangeTodolistFilterACType|AddTodoListAndTasksACType;

export type RemoveTodoListACType = {
    type: typeof REMOVE_TODOLIST,
    id: string,
};
export type AddTodoListACType = {
    type: typeof ADD_TODOLIST,
    payload:{
        id: string,
        title: string,

    },
};
type ChangeTodolistTitleACType = {
    type: typeof CHANGE_TODOLIST_TITLE,
    payload: {id:string,title:string},
};
type ChangeTodolistFilterACType = {
    type: typeof CHANGE_TODOLIST_FILTER,
    payload: {id:string,filter:FilterValuesType},
};
export type AddTodoListAndTasksACType = {
    type: typeof ADD_TODOLIST_AND_TASKS,
    payload:{
        idTodo:string,
        title: string,
    },
};

export const IdForFirstTask = v1();
export const IdForSecondTask = v1();
export const IdForThirdTask = v1();

const initialState:TodoListType[] = [

    {id: IdForFirstTask, filter: 'all', title: 'todo all'},
    {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
    {id: IdForThirdTask, filter: 'active', title: 'todo active'},

];




export const todoListsReduce = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {

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

            return state.map(td => td.id === action.payload.id ? {...td, filter: action.payload.filter} : td);

        }


        default: {
            return state
        }
    }

};











export const removeTodoListAC = (id:string):RemoveTodoListACType=> ({
    type:REMOVE_TODOLIST,
    id,
} as const);
export const addTodoListAC = (title:string):AddTodoListACType=> ({
    type:ADD_TODOLIST,
    payload:{
        id:v1(),
        title,
    },

} as const);

export const changeTodolistTitleAC = (id:string,title:string):ChangeTodolistTitleACType=> ({
    type:CHANGE_TODOLIST_TITLE,
    payload:{id,title},
} as const);

export const changeTodolistFilterAC = (id:string,filter:FilterValuesType):ChangeTodolistFilterACType=> ({
    type:CHANGE_TODOLIST_FILTER,
    payload:{id,filter},
} as const);


