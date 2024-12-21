import {TaskType, TodoListType} from "../App";
import {taskReduce} from "./task-reduce/task-reduce";
import {
    addTodoListAC,
    todoListsReduce
} from "./todolist-reduce/todolists-reduce";


test('ids should be equals', () => {

    const startStateTodoLists:TodoListType[] = [];
    const startStateTasks:{[key: string]: TaskType[]} = {};


    const action = addTodoListAC('new todo');


    const endStateTodoLists = todoListsReduce(startStateTodoLists,action);
    const endStateTasks = taskReduce(startStateTasks,action);

expect(endStateTodoLists[0].id).toBe(action.payload.id);
expect(Object.keys(endStateTasks)[0]).toBe(action.payload.id);
expect(endStateTodoLists[0].id===Object.keys(endStateTasks)[0]).toBeTruthy();


});


