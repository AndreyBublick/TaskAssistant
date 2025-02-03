import type { TodolistType } from "../../api/todolistsApi.types";
import { todolistsApi } from "../../api/todolistsApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStatus, ResultCodeStatus } from "common/enums/enums";
import { changeAppStatus, setAppError } from "../../../../app/app-reducer";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
        if (action.payload) {
          const todoLists: TodoListDomainType[] = action.payload.map((td) => ({ ...td, filter: "all" }));
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
          state.push({ ...createdTodolist, filter: "all" });
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

export const { updateTodoListFilter } = todolistsSlice.actions;
export const { getTodoLists } = todolistsSlice.selectors;

export const fetchTodoListsTC = createAsyncThunk("todolists/fetchTodoLists", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await todolistsApi.getTodolists();

    return response.data;
  } catch (error) {
    alert(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    thunkAPI.rejectWithValue(error);
    thunkAPI.dispatch(setAppError({ error: errorMessage }));
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const deleteTodoListTC = createAsyncThunk("todolists/deleteTodoList", async (id: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await todolistsApi.deleteTodolist(id);
    if (response.data.resultCode === ResultCodeStatus.success) {
      return { todolistId: id };
    }
  } catch (error) {
    alert(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    thunkAPI.rejectWithValue(error);

    thunkAPI.dispatch(setAppError({ error: errorMessage }));
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const addTodoListTC = createAsyncThunk("todolists/addTodoList", async (title: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await todolistsApi.addTodolist(title);
    if (response.data.resultCode === ResultCodeStatus.success) {
      return { createdTodolist: response.data.data.item };
    }
  } catch (error) {
    alert(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    thunkAPI.rejectWithValue(error);
    thunkAPI.dispatch(setAppError({ error: errorMessage }));
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
      }
    } catch (error) {
      alert(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      thunkAPI.rejectWithValue(error);
      thunkAPI.dispatch(setAppError({ error: errorMessage }));
    } finally {
      thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
    }
  },
);

/*export const todolistsReducer = (
  state: TodoListDomainType[] = initialState,
  action: TodoListsActionType,
): TodoListDomainType[] => {
  switch (action.type) {
    case SET_TODOLISTS: {
      return action.payload.todoLists.map((td) => ({ ...td, filter: "all" }));
    }
    case REMOVE_TODOLIST: {
      return state.filter((td) => td.id !== action.payload.id);
    }
    case ADD_TODOLIST: {
      return [...state, { ...action.payload.todoList, filter: "all" }];
    }
    case CHANGE_TODOLIST_TITLE: {
      return state.map((td) => (td.id === action.payload.id ? { ...td, title: action.payload.title } : td));
    }
    case CHANGE_TODOLIST_FILTER: {
      return state.map((td) => (td.id === action.payload.id ? { ...td, filter: action.payload.filter } : td));
    }

    default: {
      return state;
    }
  }
};*/

///AC
/*export const removeTodoListAC = (id: string) =>
  ({
    type: REMOVE_TODOLIST,
    payload: { id },
  }) as const;

export const addTodoListAC = (todoList: TodolistType) =>
  ({
    type: ADD_TODOLIST,
    payload: {
      todoList,
    },
  }) as const;

export const changeTodolistTitleAC = (payload: { id: string; title: string }) =>
  ({
    type: CHANGE_TODOLIST_TITLE,
    payload,
  }) as const;

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) =>
  ({
    type: CHANGE_TODOLIST_FILTER,
    payload,
  }) as const;

export const setTodoListsAC = (todoLists: Array<TodolistType>) =>
  ({
    type: SET_TODOLISTS,
    payload: {
      todoLists,
    },
  }) as const;*/

/////TC
/*export const getTodoListsTC = () => async (dispatch: AppDispatch) => {
  try {
    await todolistsApi.getTodolists().then((response) => dispatch(setTodoListsAC(response.data)));
  } catch (error) {
    alert(error);
  }
};

export const removeTodolistTC = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await todolistsApi.deleteTodolist(id).then(() => {
      dispatch(removeTodoListAC(id));
    });
  } catch (error) {
    alert(error);
  }
};

export const createTodolistTC = (title: string) => async (dispatch: AppDispatch) => {
  try {
    await todolistsApi.postTodolist(title).then((response) => {
      dispatch(addTodoListAC(response.data.data.item));
    });
  } catch (error) {
    alert(error);
  }
};*/

/*export const changeTodolistTitleTC = (payload: { id: string; title: string }) => async (dispatch: AppDispatch) => {
  try {
    await todolistsApi.changeTodolistTitle(payload).then(() => {
      dispatch(changeTodolistTitleAC(payload));
    });
  } catch (error) {
    alert(error);
  }
};*/

/////TYPES

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType;
};

/*type TodoListChangesDomain = {
  filter?: FilterValuesType;
  title?: string;
};*/

/*export type TodoListsActionType =
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | AddTodoListACType
  | RemoveTodoListACType
  | SetTodoListsType;*/

/*export type SetTodoListsType = ReturnType<typeof setTodoListsAC>;
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type AddTodoListACType = ReturnType<typeof addTodoListAC>;*/
