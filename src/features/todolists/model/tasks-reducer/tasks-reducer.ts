import { RootState } from "app/store";

import type { Model, TaskType } from "../../api/tasksApi.types";
import type { StatusTask } from "common/enums/enums";
import { AppStatus, ResultCodeStatus, TaskPriority } from "common/enums/enums";
import { tasksApi } from "../../api/tasksApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodoListTC, deleteTodoListTC } from "../todolist-reducer/todolists-reducer";
import { changeAppStatus, setAppError } from "app/app-reducer";

const initialState: TaskItemType = {};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  selectors: {
    getTasks: (state, todoListId: string) => state[todoListId],
  },
  reducers: {
    removeAllTasks: (state, action: PayloadAction<{ todoListId: string }>) => {
      state[action.payload.todoListId] = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskTC.fulfilled, (state, action) => {
        if (action.payload) {
          const { todoListId, task } = action.payload;
          state[todoListId].push(task);
        }
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        if (action.payload) {
          const { todolistId, tasks } = action.payload;
          state[todolistId] = tasks;
        }
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        if (action.payload) {
          const { todoListId, taskId, domainModel } = action.payload;
          const taskIndex = state[todoListId].findIndex((tsk) => tsk.id === taskId);
          if (taskIndex !== -1) {
            state[todoListId][taskIndex] = { ...state[todoListId][taskIndex], ...domainModel };
          }
        }
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        if (action.payload) {
          const { todoListId, id } = action.payload;
          const taskIndex = state[todoListId].findIndex((tsk) => tsk.id === id);
          if (taskIndex !== -1) {
            state[todoListId].splice(taskIndex, 1);
          }
        }
      })
      .addCase(deleteTodoListTC.fulfilled, (state, action) => {
        if (action.payload) {
          delete state[action.payload.todolistId];
        }
      })
      .addCase(addTodoListTC.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload.createdTodolist.id] = [];
        }
      })
      .addCase(removeAllTasksTC.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload.todoListId] = [];
        }
      });
  },
});

export const fetchTasksTC = createAsyncThunk("tasks/setTasks", async (todolistId: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await tasksApi.getTasks(todolistId);

    return {
      todolistId,
      tasks: response.data.items,
    };
  } catch (error) {
    alert(error);
    thunkAPI.rejectWithValue(error);
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});

export const createTaskTC = createAsyncThunk(
  "tasks/createTask",
  async (
    payload: {
      todoListId: string;
      title: string;
    },
    thunkAPI,
  ) => {
    try {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
      const { todoListId } = payload;
      const response = await tasksApi.createTask(payload);

      return { todoListId, task: response.data.data.item };
    } catch (error) {
      alert(error);
      thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
    }
  },
);

export const updateTaskTC = createAsyncThunk(
  "tasks/updateTask",
  async (payload: { todoListId: string; taskId: string; domainModel: DomainModel }, thunkAPI) => {
    const { todoListId, taskId, domainModel } = payload;
    const state = thunkAPI.getState() as RootState;
    const task = state.tasks[todoListId].find((tsk) => tsk.id === taskId);

    if (!task) {
      throw new Error("not the current task");
    }
    const { title, startDate, priority, deadline, status, description } = task;

    const model: Model = {
      title,
      description,
      status,
      deadline,
      priority,
      startDate,
      ...domainModel,
    };

    try {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
      const response = await tasksApi.updateTask({ todoListId, taskId, model });

      if (response.data.resultCode === ResultCodeStatus.success) {
        return payload;
      } else if (response.data.resultCode === ResultCodeStatus.fail) {
        thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
      }
    } catch (error) {
      alert(error);
      thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
    }
  },
);

export const removeTaskTC = createAsyncThunk(
  "tasks/removeTask",
  async (payload: { todoListId: string; id: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
      /*const response =*/
      await tasksApi.deleteTask(payload);
      return payload;
    } catch (error) {
      alert(error);
      thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
    }
  },
);

export const removeAllTasksTC = createAsyncThunk(
  "tasks/removeAllTasksTC",
  async ({ todoListId }: { todoListId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));

      const state: RootState = thunkAPI.getState() as RootState;

      for (const tsk of state.tasks[todoListId]) {
        await tasksApi.deleteTask({ todoListId, id: tsk.id });
      }
      /* await tasksApi.deleteTask(payload);*/
      return { todoListId };
    } catch (error) {
      alert(error);
      thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
    }
  },
);

export const { removeAllTasks } = tasksSlice.actions;
export const { getTasks } = tasksSlice.selectors;

export type TaskItemType = {
  [key: string]: TaskType[];
};

type DomainModel = {
  title?: string;
  description?: string | null;
  status?: StatusTask;
  priority?: TaskPriority;
  startDate?: string | null;
  deadline?: string | null;
};
