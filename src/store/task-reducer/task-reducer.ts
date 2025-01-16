import {v1} from "uuid";
import {TaskType} from "../../app/App";
import {
    ADD_TODOLIST,
    REMOVE_TODOLIST,

    AddTodoListACType,
    RemoveTodoListACType
} from "../todolist-reducer/todolists-reducer";


const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const ADD_TASKS_DELETE = 'ADD_TASKS_DELETE';
const CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK';
const CHANGE_TITLE_TASK = 'CHANGE_TITLE_TASK';

const initialState = {



};


type ActionType =
      RemoveTaskACType
    | AddTaskACType
    | ChangeStatusTaskACType
    | ChangeTitleTaskACType
    | AddTodoListACType
    | RemoveTodoListACType
    | RemoveAllTasksACType;

export type TaskItemType = {
    [key: string]: TaskType[];
};



export const tasksReducer = (state: TaskItemType = initialState, action: ActionType): TaskItemType => {
    switch (action.type) {
        case REMOVE_TASK: {

            return {
                ...state,
                [action.payload.idTodoList]: state[action.payload.idTodoList].filter(list => list.id !== action.payload.id)
            };
        }
        case ADD_TASK: {


            return {
                ...state,
                [action.payload.idTodoList]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.idTodoList]]
            }


        }
        case CHANGE_STATUS_TASK: {
            return {
                ...state,
                [action.payload.idTodoList]: state[action.payload.idTodoList].map(tL => tL.id === action.payload.id ? {
                    ...tL,
                    isDone: action.payload.isDone
                } : tL)
            };
        }
        case CHANGE_TITLE_TASK: {

            return {
                ...state,
                [action.payload.idTodoList]: state[action.payload.idTodoList].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.title
                } : t),

            };
        }
        case ADD_TODOLIST: {
            return {[action.payload.id]: [], ...state}
        }
        case REMOVE_TODOLIST: {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        }
        case ADD_TASKS_DELETE:{



            return {...state,[action.payload.idTodoList]:[]};
        }

        default: {
            return state;
        }
    }
};


export const removeTaskAC = (payload:{idTodoList: string, id: string,}) => ({
    type: REMOVE_TASK,
    payload: payload,
} as const);

export const addTaskAC = (payload:{idTodoList: string, title: string}) => ({
    type: ADD_TASK,
    payload: payload,
} as const);

export const changeStatusTaskAC = (payload:{idTodoList: string, id: string, isDone: boolean}) => ({
    type: CHANGE_STATUS_TASK,
    payload: payload,
} as const);

export const changeTitleTaskAC = (payload:{idTodoList: string, id: string, title: string}) => ({
    type: CHANGE_TITLE_TASK,
    payload: payload,
} as const);


export const removeAllTasksAC = (payload:{idTodoList:string}) => ({
    type: ADD_TASKS_DELETE,
    payload: payload,
} as const);




type RemoveTaskACType = ReturnType<typeof removeTaskAC>;

type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>;
type ChangeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>;
type RemoveAllTasksACType = ReturnType<typeof removeAllTasksAC>;

