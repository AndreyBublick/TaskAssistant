import type { TodolistType } from './todolistsApi.types';

import type { ResponseType } from 'common/types';
import { baseApi } from 'app/baseApi';
import type { TodoListDomain } from '../lib/types/types';

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTodolists: build.query<TodoListDomain[], void>({
      query: () => 'todo-lists',
      transformResponse: (todoLists: TodolistType[]): TodoListDomain[] =>
        todoLists.map(tl => ({ ...tl, filter: 'all' })),
      providesTags: ['Todolists'],
    }),
    addTodolist: build.mutation<ResponseType<{ item: TodolistType }>, string>({
      query: (title: string) => ({
        url: 'todo-lists',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Todolists'],
    }),

    updateTodolistTitle: build.mutation<ResponseType, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Todolists'],
    }),
    removeTodolist: build.mutation<ResponseType, string>({
      query: (id: string) => ({
        url: `todo-lists/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
            const index = state.findIndex(tl => tl.id === id);
            if (index !== -1) {
              state.splice(index, 1);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Todolists'],
    }),
  }),
});
export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi;
