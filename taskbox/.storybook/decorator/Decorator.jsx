import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../../src/features/todolists/model/todolist-reducer/todolists-reducer.ts";
import {tasksReducer} from "../../../src/features/todolists/model/tasks-reducer/tasks-reducer.ts";



const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
});
const initialState = {
        todoLists: [{id: '1', filter: 'active', title: 'asd'}],
        tasks: {'1': [{id: '1', title: 'stringTask', status: false}]},
    };

const storeTest = legacy_createStore(rootReducer, initialState);


export const Decorator =
    (Story) => (
        <Provider store={storeTest}>
            <Story/>
        </Provider>
    )
;