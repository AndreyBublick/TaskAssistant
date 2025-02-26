import type { TodolistType } from '../../api/todolistsApi.types';
import { _todolistsApi } from '../../api/todolistsApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { changeAppStatus } from 'app/appSlice';
import { fetchTasks } from '../tasksSlice/tasksSlice';
import { AppStatus, ResultCodeStatus } from 'common/enums';
import { handleServerAppError, handleServerNetworkError } from 'common/utils';

const initialState: TodoListDomain[] = [];

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  selectors: {
    getTodoLists: state => state,
    getTodoListStatus: (state, id) => {
      const todoStatus = state.find(td => td.id === id);
      if (todoStatus) {
        return todoStatus.status;
      }
      return null;
    },
  },
  reducers: create => ({
    updateTodoListFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todoListIndex = state.findIndex(tl => tl.id === action.payload.id);
      if (todoListIndex !== -1) {
        state[todoListIndex].filter = action.payload.filter;
      }
    }),
    updateTodoListStatus: create.reducer<{ id: string; status: AppStatus }>((state, action) => {
      const todoListIndex = state.findIndex(tl => tl.id === action.payload.id);
      if (todoListIndex !== -1) {
        state[todoListIndex].status = action.payload.status;
      }
    }),
    clearTodolists: create.reducer(() => []),
  }),
  extraReducers: builder => {
    builder
      .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
        if (action.payload) {
          const todoLists: TodoListDomain[] = action.payload.map(td => ({
            ...td,
            filter: 'all',
            status: AppStatus.idle,
          }));
          state.length = 0;
          state.push(...todoLists);
        }
      })
      .addCase(deleteTodoListTC.fulfilled, (state, action) => {
        const todolistId = action.payload?.todolistId;

        if (todolistId) {
          const todoListIndex = state.findIndex(td => td.id === todolistId);
          if (todoListIndex !== -1) {
            state.splice(todoListIndex, 1);
          }
        }
      })
      .addCase(addTodoListTC.fulfilled, (state, action) => {
        const createdTodolist = action.payload?.createdTodolist;

        if (createdTodolist) {
          state.unshift({ ...createdTodolist, filter: 'all', status: AppStatus.idle });
        }
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const payload = action.payload;

        if (payload) {
          const todoListIndex = state.findIndex(td => td.id === payload.id);
          if (todoListIndex !== -1) {
            state[todoListIndex].title = payload.title;
          }
        }
      });
  },
});
export const todolistsReducer = todolistsSlice.reducer;
export const { updateTodoListFilter, updateTodoListStatus, clearTodolists } = todolistsSlice.actions;
export const { getTodoLists, getTodoListStatus } = todolistsSlice.selectors;

export const fetchTodoListsTC = createAsyncThunk('todolists/fetchTodoLists', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await _todolistsApi.getTodolists();

    response.data.forEach(td => thunkAPI.dispatch(fetchTasks(td.id)));

    return response.data;
  } catch (error) {
    handleServerNetworkError({ error, thunkAPI });
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});

export const deleteTodoListTC = createAsyncThunk('todolists/deleteTodoList', async (id: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateTodoListStatus({ id, status: AppStatus.loading }));
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));

    const response = await _todolistsApi.deleteTodolist(id);

    if (response.data.resultCode === ResultCodeStatus.success) {
      return { todolistId: id };
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      handleServerAppError({ thunkAPI, response });
    }
  } catch (error) {
    handleServerNetworkError({ error, thunkAPI });
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});

export const addTodoListTC = createAsyncThunk('todolists/addTodoList', async (title: string, thunkAPI) => {
  try {
    /*thunkAPI.dispatch(setAppError({ error: null }));*/

    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await _todolistsApi.addTodolist(title);

    if (response.data.resultCode === ResultCodeStatus.success) {
      return { createdTodolist: response.data.data.item };
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      handleServerAppError({ thunkAPI, response });
    }
  } catch (error) {
    handleServerNetworkError({ error, thunkAPI });
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});

export const changeTodolistTitleTC = createAsyncThunk(
  'todolists/changeTodolistTitle',
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(updateTodoListStatus({ id: payload.id, status: AppStatus.loading }));
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
      const response = await _todolistsApi.changeTodolistTitle(payload);
      if (response.data.resultCode === ResultCodeStatus.success) {
        return payload;
      } else if (response.data.resultCode === ResultCodeStatus.fail) {
        handleServerAppError({ thunkAPI, response });
      }
    } catch (error) {
      handleServerNetworkError({ error, thunkAPI });
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
      thunkAPI.dispatch(updateTodoListStatus({ id: payload.id, status: AppStatus.succeeded }));
    }
  },
);

export type FilterValuesType = 'all' | 'active' | 'completed' | 'three';

export type TodoListDomain = TodolistType & {
  filter: FilterValuesType;
  status: AppStatus;
};
