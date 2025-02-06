import type { TodolistType } from "../../api/todolistsApi.types";
import { todolistsApi } from "../../api/todolistsApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStatus, ResultCodeStatus } from "common/enums/enums";
import { changeAppStatus, setAppError } from "app/app-reducer";
import { errorHandler } from "common/utils/utils";

const initialState: TodoListDomainType[] = [];

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  selectors: {
    getTodoLists: (state) => state,
  },
  reducers: {
    updateTodoListFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todoListIndex = state.findIndex((tl) => tl.id === action.payload.id);
      if (todoListIndex !== -1) {
        state[todoListIndex].filter = action.payload.filter;
      }
    },
    updateTodoListStatus: (state, action: PayloadAction<{ id: string; status: AppStatus }>) => {
      const todoListIndex = state.findIndex((tl) => tl.id === action.payload.id);
      if (todoListIndex !== -1) {
        state[todoListIndex].status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
        if (action.payload) {
          const todoLists: TodoListDomainType[] = action.payload.map((td) => ({
            ...td,
            filter: "all",
            status: AppStatus.idle,
          }));
          state.push(...todoLists);
        }
      })
      .addCase(deleteTodoListTC.fulfilled, (state, action) => {
        const todolistId = action.payload?.todolistId;

        if (todolistId) {
          const todoListIndex = state.findIndex((td) => td.id === todolistId);
          if (todoListIndex !== -1) {
            state.splice(todoListIndex, 1);
          }
        }
      })
      .addCase(addTodoListTC.fulfilled, (state, action) => {
        const createdTodolist = action.payload?.createdTodolist;

        if (createdTodolist) {
          state.push({ ...createdTodolist, filter: "all", status: AppStatus.idle });
        }
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const payload = action.payload;

        if (payload) {
          const todoListIndex = state.findIndex((td) => td.id === payload.id);
          if (todoListIndex !== -1) {
            state[todoListIndex].title = payload.title;
          }
        }
      });
  },
});

export const { updateTodoListFilter, updateTodoListStatus } = todolistsSlice.actions;
export const { getTodoLists } = todolistsSlice.selectors;

export const fetchTodoListsTC = createAsyncThunk("todolists/fetchTodoLists", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await todolistsApi.getTodolists();

    return response.data;
  } catch (error) {
    errorHandler({ error, thunkAPI });
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const deleteTodoListTC = createAsyncThunk("todolists/deleteTodoList", async (id: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateTodoListStatus({ id, status: AppStatus.loading }));
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await todolistsApi.deleteTodolist(id);
    if (response.data.resultCode === ResultCodeStatus.success) {
      return { todolistId: id };
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
    }
  } catch (error) {
    errorHandler({ error, thunkAPI });
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const addTodoListTC = createAsyncThunk("todolists/addTodoList", async (title: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppError({ error: null }));
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await todolistsApi.addTodolist(title);
    if (response.data.resultCode === ResultCodeStatus.success) {
      return { createdTodolist: response.data.data.item };
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
    }
  } catch (error) {
    errorHandler({ error, thunkAPI });
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const changeTodolistTitleTC = createAsyncThunk(
  "todolists/changeTodolistTitle",
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
      const response = await todolistsApi.changeTodolistTitle(payload);
      if (response.data.resultCode === ResultCodeStatus.success) {
        return payload;
      } else if (response.data.resultCode === ResultCodeStatus.fail) {
        thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
      }
    } catch (error) {
      errorHandler({ error, thunkAPI });
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
    }
  },
);

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType;
  status: AppStatus;
};
