import { instance } from 'common/instance';
import type { Model, TaskType } from './tasksApi.types';

import type { ResponseType } from 'common/types';
import { baseApi } from 'app/baseApi';

export const _tasksApi = {
  ///tasks
  getTasks(todolistId: string) {
    return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(payload: { todoListId: string; id: string }) {
    const { todoListId, id } = payload;
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${id}`);
  },

  createTask(payload: { todoListId: string; title: string }) {
    const { todoListId, title } = payload;

    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, { title });
  },

  updateTask(payload: { todoListId: string; taskId: string; model: Model }) {
    const { todoListId, taskId, model } = payload;

    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model);
  },
};

////TYPES

export const tasksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createTask: build.mutation<ResponseType<{ item: TaskType }>, { todoListId: string; title: string }>({
      query: ({ todoListId, title }) => ({
        url: `todo-lists/${todoListId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Tasks'],
    }),
    getTasks: build.query<GetTasksType, string>({
      query: todolistId => `todo-lists/${todolistId}/tasks`,
      providesTags: ['Tasks'],
    }),

    deleteTask: build.mutation<ResponseType, { todoListId: string; id: string }>({
      query: ({ todoListId, id }) => ({
        url: `todo-lists/${todoListId}/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: build.mutation<ResponseType<{ item: TaskType }>, { todoListId: string; taskId: string; model: Model }>({
      query: ({ todoListId, taskId, model }) => ({
        url: `todo-lists/${todoListId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});
export const { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } = tasksApi;
type GetTasksType = {
  items: Array<TaskType>;
  totalCount: number;
  error: null | string;
};
