import {v1} from "uuid";
import {TaskType} from "../../App";
import {
    ADD_TODOLIST,
    REMOVE_TODOLIST,
    AddTodoListACType,
    AddTodoListAndTasksACType,
    RemoveTodoListACType
} from "../todolist-reduce/todolists-reduce";


const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const ADD_TASKS_DELETE = 'ADD_TASKS_DELETE';
const CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK';
const CHANGE_TITLE_TASK = 'CHANGE_TITLE_TASK';

const defaultState = {

    [1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},],
    [2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},],
    [3]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},],

};


type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeStatusTaskACType
    | ChangeTitleTaskACType
    | AddTodoListACType
    | AddTodoListAndTasksACType
    | RemoveTodoListACType
    | RemoveAllTasksACType;

type StateType = {
    [key: string]: TaskType[];
};
type RemoveTaskACType = {
    type: typeof REMOVE_TASK,
    payload: {
        idTodoList: string,
        id: string,
    },
};
type AddTaskACType = {
    type: typeof ADD_TASK,
    payload: {
        idTodoLists: string,
        title: string,
    },
};
type ChangeStatusTaskACType = {
    type: typeof CHANGE_STATUS_TASK,
    payload: {
        idTodoLists: string,
        id: string,
        isDone: boolean,
    },
};
type ChangeTitleTaskACType = {
    type: typeof CHANGE_TITLE_TASK,
    payload: {
        idTodoLists: string,
        id: string,
        title: string,
    },
};
type RemoveAllTasksACType = {
    type: typeof ADD_TASKS_DELETE,
    payload: {
        idTodoLists: string,
    },
};
export const taskReduce = (state: StateType = defaultState, action: ActionType): StateType => {
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
                [action.payload.idTodoLists]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.idTodoLists]]
            }


        }
        case CHANGE_STATUS_TASK: {
            return {
                ...state,
                [action.payload.idTodoLists]: state[action.payload.idTodoLists].map(tL => tL.id === action.payload.id ? {
                    ...tL,
                    isDone: action.payload.isDone
                } : tL)
            };
        }
        case CHANGE_TITLE_TASK: {

            return {
                ...state,
                [action.payload.idTodoLists]: state[action.payload.idTodoLists].map(t => t.id === action.payload.id ? {
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
            delete stateCopy[action.id];
            return stateCopy;
        }
        case ADD_TASKS_DELETE:{



            return {...state,[action.payload.idTodoLists]:[]};
        }

        default: {
            return state;
        }
    }
};


export const removeTaskAC = (idTodoList: string, id: string,): RemoveTaskACType => ({
    type: REMOVE_TASK,
    payload: {
        idTodoList,
        id,
    },
});

export const addTaskAC = (idTodoLists: string, title: string): AddTaskACType => ({
    type: ADD_TASK,
    payload: {
        idTodoLists,
        title,
    },
});

export const changeStatusTaskAC = (idTodoLists: string, id: string, isDone: boolean): ChangeStatusTaskACType => ({
    type: CHANGE_STATUS_TASK,
    payload: {
        idTodoLists,
        id,
        isDone,
    },
});

export const changeTitleTaskAC = (idTodoLists: string, id: string, title: string): ChangeTitleTaskACType => ({
    type: CHANGE_TITLE_TASK,
    payload: {
        idTodoLists,
        id,
        title,
    },
});


export const removeAllTasksAC = (idTodoLists:string):RemoveAllTasksACType => ({
    type: ADD_TASKS_DELETE,
    payload: {idTodoLists},
});

