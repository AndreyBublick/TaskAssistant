import { instance } from 'common/instance';
import type { Model, TaskType } from './tasksApi.types';

import type { ResponseType } from 'common/types';
import { baseApi } from 'app/baseApi';

export const PAGE_SIZE = 2;

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
      invalidatesTags: (result, error, { todoListId }) => [{ type: 'Tasks', id: todoListId }],
    }),
    getTasks: build.query<GetTasksType, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...args, count: PAGE_SIZE },
      }),
      providesTags: (result, error, arg, meta) =>
        result
          ? [
              ...result.items.map(tsk => ({ type: 'Tasks', id: tsk.id }) as const),
              { type: 'Tasks', id: arg.todolistId },
            ]
          : ['Tasks'],
    }),

    deleteTask: build.mutation<ResponseType, { todoListId: string; id: string }>({
      query: ({ todoListId, id }) => ({
        url: `todo-lists/${todoListId}/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }, meta) => [{ type: 'Tasks', id }],
    }),

    updateTask: build.mutation<ResponseType<{ item: TaskType }>, { todoListId: string; taskId: string; model: Model }>({
      query: ({ todoListId, taskId, model }) => ({
        url: `todo-lists/${todoListId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      async onQueryStarted({ taskId, model, todoListId }, { queryFulfilled, dispatch, getState }) {
        const cash = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks');

        const patchResults: any[] = [];

        for (const data of cash) {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                { todolistId: todoListId, args: { page: data.args.page /**/ } },
                state => {
                  const task = state.items.find(tsk => tsk.id === taskId);

                  if (task) {
                    task.status = model.status;
                  }
                },
              ),
            ),
          );
        }

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach(patchResult => patchResult.undo());
        }
      },
      invalidatesTags: (result, error, { taskId }, meta) => [{ type: 'Tasks', id: taskId }],
    }),
  }),
});
export const { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } = tasksApi;
type GetTasksType = {
  items: Array<TaskType>;
  totalCount: number;
  error: null | string;
};
