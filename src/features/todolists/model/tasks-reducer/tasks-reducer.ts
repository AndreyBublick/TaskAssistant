import { RootState } from "../../../../app/store";

import type { Model, TaskType } from "../../api/tasksApi.types";
import type { StatusTask } from "common/enums/enums";
import { AppStatus, ResultCodeStatus, TaskPriority } from "common/enums/enums";
import { tasksApi } from "../../api/tasksApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodoListTC, deleteTodoListTC } from "../todolist-reducer/todolists-reducer";
import { changeAppStatus } from "../../../../app/app-reducer";

const initialState: TaskItemType = {};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  selectors: {
    getTasks: (state, todoListId: string) => {
      return state[todoListId];
    },
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
      });
  },
  ///
  ////

  /*const { todoListId, taskId, domainModel } = payload;
    const task = getState().tasks[todoListId].find((tsk) => tsk.id === taskId);

    if (!task) {
      throw new Error("not found task");
    }

    const { title, startDate, priority, deadline, description, status } = task;

    const model: Model = {
      title,
      startDate,
      priority,
      deadline,
      description,
      status,
      ...domainModel,
    };

    try {
      await tasksApi.updateTask({ todoListId, taskId, model }).then(() => {
        dispatch(updateTaskAC({ todoListId, taskId, model }));
      });
    } catch (error) {
      alert(error);
    }*/
  ///
  ///
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

export const { removeAllTasks } = tasksSlice.actions;
export const { getTasks } = tasksSlice.selectors;

/*export const tasksReducer = (state: TaskItemType = initialState, action: TasksActionType): TaskItemType => {
  switch (action.type) {
    /!*case REMOVE_TASK: {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter((list) => list.id !== action.payload.id),
      };
    }*!/
    /!*case ADD_TASK: {
      const { todoListId, task } = action.payload;

      return { ...state, [todoListId]: [...state[todoListId], task] };
    }*!/
    case UPDATE_TASK: {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((tL) =>
          tL.id === action.payload.taskId ? { ...tL, ...action.payload.model } : tL,
        ),
      };
    }
    case ADD_TODOLIST: {
      return { [action.payload.todoList.id]: [], ...state };
    }
    case REMOVE_TODOLIST: {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.id];
      return stateCopy;
    }
    case DELETE_ALL_THE_TASKS_TODOLIST: {
      return { ...state, [action.payload.todoListId]: [] };
    }
    case SET_TODOLISTS: {
      return action.payload.todoLists.reduce((acc, cur) => ({ ...acc, [cur.id]: [] }), { ...state });
    }
    /!*case SET_TASKS: {
      const { todolistId, tasks } = action.payload;
      return { ...state, [todolistId]: tasks };
    }*!/

    default: {
      return state;
    }
  }
};*/

/////AC
/*
export const removeTaskAC = (payload: { todoListId: string; id: string }) =>
  ({
    type: REMOVE_TASK,
    payload,
  }) as const;

export const addTaskAC = (payload: { todoListId: string; task: TaskType }) =>
  ({
    type: ADD_TASK,
    payload,
  }) as const;

export const updateTaskAC = (payload: { todoListId: string; taskId: string; model: domainModel }) =>
  ({
    type: UPDATE_TASK,
    payload,
  }) as const;

export const removeAllTasksAC = (payload: { todoListId: string }) =>
  ({
    type: DELETE_ALL_THE_TASKS_TODOLIST,
    payload,
  }) as const;

export const setTasksAC = (payload: { todolistId: string; tasks: TaskType[] }) =>
  ({
    type: SET_TASKS,
    payload,
  }) as const;
*/

/////TC

/*export const getTasksTC = (todolistId: string) => async (dispatch: AppDispatch) => {
  try {
    await tasksApi.getTasks(todolistId).then((response) =>
      dispatch(
        setTasksAC({
          todolistId,
          tasks: response.data.items,
        }),
      ),
    );
  } catch (error) {
    alert(error);
  }
};*/

/*export const removeTaskTC = (payload: { todoListId: string; id: string }) => async (dispatch: AppDispatch) => {
  try {
    await tasksApi.deleteTask(payload).then(() => dispatch(removeTaskAC(payload)));
  } catch (error) {
    alert(error);
  }
};*/

/*export const createTaskTC = (payload: { todoListId: string; title: string }) => async (dispatch: AppDispatch) => {
  const { todoListId } = payload;
  tasksApi.createTask(payload).then((response) => {
    dispatch(addTaskAC({ todoListId, task: response.data.data.item }));
  });
};*/

/*export const updateTaskTC =
  (payload: updateTaskTC) =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const { todoListId, taskId, domainModel } = payload;
    const task = getState().tasks[todoListId].find((tsk) => tsk.id === taskId);

    if (!task) {
      throw new Error("not found task");
    }

    const { title, startDate, priority, deadline, description, status } = task;

    const model: Model = {
      title,
      startDate,
      priority,
      deadline,
      description,
      status,
      ...domainModel,
    };

    try {
      await tasksApi.updateTask({ todoListId, taskId, model }).then(() => {
        dispatch(updateTaskAC({ todoListId, taskId, model }));
      });
    } catch (error) {
      alert(error);
    }
  };*/

////TYPES

/*export type TasksActionType =
  | ReturnType<typeof removeAllTasksAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodoListACType
  | RemoveTodoListACType
  | SetTodoListsType;*/

/*export type TaskDomainType = TaskType;*/

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
