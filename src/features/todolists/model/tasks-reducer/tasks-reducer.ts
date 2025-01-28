import {
    ADD_TODOLIST,
    AddTodoListACType,
    REMOVE_TODOLIST,
    RemoveTodoListACType,
    SET_TODOLISTS,
    SetTodoListsType
} from "../todolist-reducer/todolists-reducer";
import {Model, StatusTask, TaskPriority, TaskType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RootStateType} from "../../../../app/store";


const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const DELETE_ALL_THE_TASKS_TODOLIST = 'DELETE_ALL_THE_TASKS_TODOLIST';
const CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK';
const CHANGE_TITLE_TASK = 'CHANGE_TITLE_TASK';
const SET_TASKS = 'SET_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

const initialState: TaskItemType = {};


type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    /*| ChangeTitleTaskACType*/
    | AddTodoListACType
    | RemoveTodoListACType
    | RemoveAllTasksACType
    | SetTodoListsType
    | SetTasksACType;

export type TaskDomainType = TaskType;

export type TaskItemType = {
    [key: string]: TaskDomainType[];
};


export const tasksReducer = (state: TaskItemType = initialState, action: ActionType): TaskItemType => {


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

            /*return {
                ...state,
                [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.title,
                    status: StatusTask.New,/!*StatusTask*!/
                    todoListId: action.payload.todoListId,
                    order: 0,
                    addedDate: '',
                    description: null,
                    priority: TaskPriority.Low,
                    startDate: '',
                    deadline: '',


                } as TaskDomainType,
                    ...state[action.payload.todoListId]]
            }*/


        }
        case UPDATE_TASK: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(tL => tL.id === action.payload.taskId ? {
                    ...tL,
                    ...action.payload.model,
                } : tL)
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


            return action.payload.todoLists.reduce((acc, cur) => ({...acc, [cur.id]: []}), {});

        }
        case SET_TASKS: {

            const {todolistId, tasks} = action.payload;

            /* const result = action.payload.tasks.reduce((acc, cur) => ({...acc, [cur.todoListId]: cur}), {})*/
            return {...state, [todolistId]: tasks};
        }


        default: {
            return state;
        }
    }
};


export const removeTaskAC = (payload: { todoListId: string, id: string, }) => ({
    type: REMOVE_TASK,
    payload: payload,
} as const);

export const addTaskAC = (payload: { todoListId: string, task: TaskType }) => ({
    type: ADD_TASK,
    payload,
} as const);

export const updateTaskAC = (payload: { todoListId: string, taskId: string, model: UpdateDomainModal }) => ({
    type: UPDATE_TASK,
    payload,
} as const);

/*export const changeTitleTaskAC = (payload: { todoListId: string, taskId: string, title: string }) => ({
    type: CHANGE_TITLE_TASK,
    payload: payload,
} as const);*/

export const removeAllTasksAC = (payload: { todoListId: string }) => ({
    type: DELETE_ALL_THE_TASKS_TODOLIST,
    payload: payload,
} as const);

export const setTasksAC = (payload: { todolistId: string, tasks: TaskType[] }) => ({
    type: SET_TASKS,
    payload,
} as const);


export const getTasksTC = (todolistId: string) => {


    return async (dispatch: Dispatch) => {
        try {
            await todolistsApi.getTasks(todolistId).then(response => dispatch(setTasksAC({
                todolistId,
                tasks: response.data.items
            })));
        } catch (error) {
            alert(error);
        }
    };
};
export const removeTaskTC = (payload: { todoListId: string, id: string }) => {
    return async (dispatch: Dispatch) => {
        try {
            await todolistsApi.deleteTask(payload).then(() => {
                dispatch(removeTaskAC(payload));
            });
        } catch (error) {
            alert(error);
        }
    };
};
export const createTaskTC = (payload: { todoListId: string, title: string }) => {
    const {todoListId} = payload;
    return async (dispatch: Dispatch) => {
        todolistsApi.createTask(payload).then(response => {
            dispatch(addTaskAC({todoListId, task: response.data.data.item}));
        });
    };
};



export const updateTaskTC = (payload: { todoListId: string, taskId: string, domainModel: UpdateDomainModal}) => {


    const {todoListId, taskId, domainModel} = payload;

    return async (dispatch: Dispatch, getState: () => RootStateType) => {


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
};


/*export const changeTaskTitleTC = (payload: { todoListId: string, taskId: string, title: string }) => {

    const {todoListId, taskId, title} = payload;


    return async (dispatch: Dispatch, getState: () => RootStateType) => {

        const task = getState().tasks[todoListId].find(tsk => tsk.id === taskId);

        if (!task) {
            throw new Error('not found task');
        }
        const {status, startDate, priority, deadline, description} = task;


        const model: Model = {
            title,
            startDate,
            priority,
            deadline,
            description,
            status,
        };
        try {
            await todolistsApi.changeTaskTitle({todoListId, taskId, model}).then(() => {
                dispatch(changeTitleTaskAC({todoListId, taskId, title: model.title}));
            });
        } catch (error) {
            alert(error);
        }


    };
};*/


type UpdateDomainModal = {
    title?: string,
    description?: string|null,
    status?: StatusTask,
    priority?: TaskPriority,
    startDate?: string|null,
    deadline?: string|null,
};

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type SetTasksACType = ReturnType<typeof setTasksAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type UpdateTaskACType = ReturnType<typeof updateTaskAC>;
/*type ChangeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>;*/
type RemoveAllTasksACType = ReturnType<typeof removeAllTasksAC>;

