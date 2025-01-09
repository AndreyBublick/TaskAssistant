import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {tasksReducer} from "./task-reducer/task-reducer";
import {todolistsReducer} from "./todolist-reducer/todolists-reducer";



const rootReducer = combineReducers({
    todoLists:todolistsReducer,
    tasks:tasksReducer,
});

export const store:Store<RootStateType> = createStore(rootReducer);


export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof rootReducer>;