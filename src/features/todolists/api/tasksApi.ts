import { instance } from "common/instance/instance";
import type { Model, TaskType } from "./tasksApi.types";

import type { ResponseType } from "common/types/types";

export const tasksApi = {
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

type GetTasksType = {
  items: Array<TaskType>;
  totalCount: number;
  error: null | string;
};
