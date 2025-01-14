import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../../src/store/todolist-reducer/todolists-reducer.ts";
import {tasksReducer} from "../../../src/store/task-reducer/task-reducer.ts";
import { store} from "../../../src/store/store.ts"; // Путь к вашему хранилищу


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
});
const initialState = {
        todoLists: [{id: '1', filter: 'active', title: 'asd'}],
        tasks: {'1': [{id: '1', title: 'stringTask', isDone: false}]},
    };

const storeTest = legacy_createStore(rootReducer, initialState);


export const Decorator =
    (Story) => (
        <Provider store={storeTest}>
            <Story/>
        </Provider>
    )
;