import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {tasksReducer} from "../features/todolists/model/task-reducer/task-reducer";
import {todolistsReducer} from "../features/todolists/model/todolist-reducer/todolists-reducer";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    app:appReducer,
    todoLists:todolistsReducer,
    tasks:tasksReducer,
});

export const store:Store<RootStateType> = createStore(rootReducer);


export type AppDispatch = typeof store.dispatch;




export type RootStateType = ReturnType<typeof rootReducer>;

