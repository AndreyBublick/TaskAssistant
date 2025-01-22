import axios from "axios";


export const params = {
    withCredentials: true,
    headers: {
        'API-KEY': '0e5967bc-e11b-4c40-96f7-71fb2dbec90c',
    },
};

const request = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...params,
});


export const todolistsApi = {

    getTodolists() {
        return request.get<TodolistType[]>('')
    },

    postTodolist(title: string) {
        return request.post<ResponseType<{ item: TodolistType }>>('', {title});

    },

    putTodolist({id, title}: { id: string, title: string }) {

        return request.put<ResponseType>(`${id}`, {title});

    },

    deleteTodolist(id: string) {
        return request.delete<ResponseType>(`${id}`);
    },

    ///tasks
    getTasks(todolistId: string) {
        return request.get<GetTasksType>(`${todolistId}/tasks`);
    },

    deleteTask(payload: { todolistId: string, id: string }) {
        const {todolistId, id} = payload;
        return request.delete<ResponseType>(`${todolistId}/tasks/${id}`);
    },

    postTask(payload: { todolistId: string, title: string }) {

        const {todolistId, title} = payload;

        return request.post<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, {title});
    },

    putTask(payload: { todolistId: string, id: string, model: any }) {

        return request.put('',{});

    },
}
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
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
};
export type TodolistType = {
    addedDate: string,
    id: string,
    order: number,
    title: string,
};

