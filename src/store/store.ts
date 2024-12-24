import {combineReducers, createStore, Store} from "redux";
import {taskReducer} from "./task-reduce/task-reduce";
import {todoListsReduce} from "./todolist-reduce/todolists-reduce";


const rootReducer = combineReducers({
    todoLists:todoListsReduce,
    tasks:taskReducer,
});

export const store:Store<StateType> = createStore(rootReducer);



export type StateType = ReturnType<typeof rootReducer>;