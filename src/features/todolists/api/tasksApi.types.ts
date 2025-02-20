import type { StatusTask, TaskPriority } from 'common/enums';

export type TaskType = {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  title: string;
  description: string | null;
  status: StatusTask;
  priority: TaskPriority;
  startDate: string | null;
  deadline: string | null;
};

export type Model = Pick<TaskType, 'title' | 'description' | 'status' | 'priority' | 'startDate' | 'deadline'>;
