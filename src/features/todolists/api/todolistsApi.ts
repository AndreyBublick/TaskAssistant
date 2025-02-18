import { instance } from "common/instance";
import type { TodolistType } from "./todolistsApi.types";

import type { ResponseType } from "common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },

  addTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title });
  },

  changeTodolistTitle({ id, title }: { id: string; title: string }) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title });
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
};

////TYPES
