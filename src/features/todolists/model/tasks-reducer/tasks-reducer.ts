import {
    AddTodoListACType,
    RemoveTodoListACType,
    SetTodoListsType,
    ADD_TODOLIST,
    REMOVE_TODOLIST,
    SET_TODOLISTS,
} from "../todolist-reducer/todolists-reducer";
import {Model, TaskType, todolistsApi} from "../api/todolists-api";
import {AppDispatch, RootStateType} from "../../../../app/store";
import {StatusTask, TaskPriority} from "../../../../common/enums/enums";


const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const DELETE_ALL_THE_TASKS_TODOLIST = 'DELETE_ALL_THE_TASKS_TODOLIST';

const SET_TASKS = 'SET_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

const initialState: TaskItemType = {};





export const tasksReducer = (state: TaskItemType = initialState, action: TasksActionType): TaskItemType => {


    switch (action.type) {

        case REMOVE_TASK: {

            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(list => list.id !== action.payload.id)
            };
        }
        case ADD_TASK: {

            const {todoListId, task} = action.payload;

            return {...state, [todoListId]: [...state[todoListId], task]}

        }
        case UPDATE_TASK: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(tL => tL.id === action.payload.taskId ?
                    {...tL, ...action.payload.model,}
                : tL)
            };
        }
        case ADD_TODOLIST: {
            return {[action.payload.todoList.id]: [], ...state}
        }
        case REMOVE_TODOLIST: {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        }
        case DELETE_ALL_THE_TASKS_TODOLIST: {

            return {...state, [action.payload.todoListId]: []};

        }
        case SET_TODOLISTS: {

            return action.payload.todoLists.reduce((acc, cur) => ({...acc, [cur.id]: []}), {...state});

        }
        case SET_TASKS: {

            const {todolistId, tasks} = action.payload;
            return {...state, [todolistId]: tasks};

        }

        default: {
            return state;
        }
    }
};

/////AC
export const removeTaskAC = (payload: { todoListId: string, id: string, }) => ({
    type: REMOVE_TASK,
    payload,
} as const);

export const addTaskAC = (payload: { todoListId: string, task: TaskType }) => ({
    type: ADD_TASK,
    payload,
} as const);

export const updateTaskAC = (payload: { todoListId: string, taskId: string, model: UpdateDomainModal }) => ({
    type: UPDATE_TASK,
    payload,
} as const);

export const removeAllTasksAC = (payload: { todoListId: string }) => ({
    type: DELETE_ALL_THE_TASKS_TODOLIST,
    payload,
} as const);

export const setTasksAC = (payload: { todolistId: string, tasks: TaskType[] }) => ({
    type: SET_TASKS,
    payload,
} as const);

/////TC

export const getTasksTC = (todolistId: string) =>
    async (dispatch: AppDispatch) =>
{
        try {
            await todolistsApi.getTasks(todolistId).then(response => dispatch(setTasksAC({
                todolistId,
                tasks: response.data.items
            })));
        } catch (error) {
            alert(error);
        }
    };

export const removeTaskTC = (payload: { todoListId: string, id: string }) =>
    async (dispatch: AppDispatch) => {
        try {
            await todolistsApi.deleteTask(payload).then(() => {
                dispatch(removeTaskAC(payload));
            });
        } catch (error) {
            alert(error);
        }
    };

export const createTaskTC = (payload: { todoListId: string, title: string }) =>
    async (dispatch: AppDispatch) => {
        const {todoListId} = payload;
        todolistsApi.createTask(payload).then(response => {
            dispatch(addTaskAC({todoListId, task: response.data.data.item}));
        });

};

export const updateTaskTC = (payload: { todoListId: string, taskId: string, domainModel: UpdateDomainModal}) =>
    async (dispatch: AppDispatch, getState: () => RootStateType) => {

        const {todoListId, taskId, domainModel} = payload;
        const task = getState().tasks[todoListId].find(tsk => tsk.id === taskId);

        if (!task) {
            throw new Error('not found task');
        }

        const {title, startDate, priority, deadline, description,status} = task;

        const model: Model = {
            title,
            startDate,
            priority,
            deadline,
            description,
            status,
            ...domainModel,
        };

        try {
            await todolistsApi.changeTaskStatus({todoListId, taskId, model}).then(() => {
                dispatch(updateTaskAC({todoListId, taskId, model}));
            });
        } catch (error) {
            alert(error);
        }



};

////TYPES

export type TasksActionType =
    | ReturnType<typeof removeAllTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>

    | AddTodoListACType
    | RemoveTodoListACType
    | SetTodoListsType


export type TaskDomainType = TaskType;

export type TaskItemType = {
    [key: string]: TaskDomainType[];
};

type UpdateDomainModal = {
    title?: string,
    description?: string|null,
    status?: StatusTask,
    priority?: TaskPriority,
    startDate?: string|null,
    deadline?: string|null,
};



