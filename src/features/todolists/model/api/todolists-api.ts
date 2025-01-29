import {instance} from "../../../../common/instance/instance";
import {ResultCodeStatus, StatusTask, TaskPriority} from "../../../../common/enums/enums";






export const todolistsApi = {

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    postTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});

    },

    changeTodolistTitle({id, title}: { id: string, title: string }) {

        return instance.put<ResponseType>(`todo-lists/${id}`, {title});

    },

    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },

    ///tasks
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`);
    },

    deleteTask(payload: { todoListId: string, id: string }) {
        const {todoListId, id} = payload;
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${id}`);
    },

    createTask(payload: { todoListId: string, title: string }) {

        const {todoListId, title} = payload;

        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title});
    },

    changeTaskTitle(payload:{todoListId:string,taskId:string,model:Model}){


        const {todoListId,taskId,model} = payload;
       return instance.put<ChangeTaskTitleResponse>(`todo-lists/${todoListId}/tasks/${taskId}`,model);
    },

    changeTaskStatus({todoListId,taskId,model}:{todoListId:string,taskId:string,model:Model}){

        return instance.put<ChangeTaskTitleResponse>(`todo-lists/${todoListId}/tasks/${taskId}`,model);

    },

}


////TYPES



export type Model = {
    title: string,
    description: string|null,
    status: StatusTask,
    priority: TaskPriority,
    startDate: string|null,
    deadline: string|null,
};

type FieldError = {  error: string , field: string};

type ResponseType<D = {}> = {
    data: D,
    fieldsErrors: Array<FieldError>,
    messages: Array<string>,
    resultCode: number,
};

type GetTasksType = {
    items: Array<TaskType>,
    totalCount: number,
    error: null | string,
};

export type TaskType = {
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
} & Model;

export type TodolistType = {
    addedDate: string,
    id: string,
    order: number,
    title: string,
};





type ChangeTaskTitleResponse = {
    resultCode: ResultCodeStatus,
    messages: Array<string>,
    data: {items: Array<TaskType>},
};
