import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import { todolistsSlice } from '../../../src/features/todolists/model/todolistSlice/todolistsSlice.ts';
import { tasksSlice } from '../../../src/features/todolists/model/tasksSlice/tasksSlice.ts';

const rootReducer = combineReducers({
  todoLists: todolistsSlice,
  tasks: tasksSlice,
});
const initialState = {
  todoLists: [{ id: '1', filter: 'active', title: 'asd' }],
  tasks: { 1: [{ id: '1', title: 'stringTask', status: false }] },
};

const storeTest = legacy_createStore(rootReducer, initialState);

export const Decorator = Story => (
  <Provider store={storeTest}>
    <Story />
  </Provider>
);
