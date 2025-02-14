import type { StatusTask } from "common/enums/enums";
import { TaskPriority } from "common/enums/enums";

export type TaskType = {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
} & Model;

export type Model = {
  title: string;
  description: string | null;
  status: StatusTask;
  priority: TaskPriority;
  startDate: string | null;
  deadline: string | null;
};
