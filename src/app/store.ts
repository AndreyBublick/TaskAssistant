import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore, Store} from "redux";
import {TasksActionType, tasksReducer} from "../features/todolists/model/tasks-reducer/tasks-reducer";
import {TodoListsActionType, todolistsReducer} from "../features/todolists/model/todolist-reducer/todolists-reducer";
import {appReducer} from "./app-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";




const rootReducer = combineReducers({
    app:appReducer,
    todoLists:todolistsReducer,
    tasks:tasksReducer,

});

export const store:Store<RootStateType> = createStore(rootReducer,applyMiddleware(thunk));


export type AppDispatch = ThunkDispatch<RootStateType, unknown, TasksActionType | TodoListsActionType>;
/*typeof store.dispatch*/



export type RootStateType = ReturnType<typeof rootReducer>;

