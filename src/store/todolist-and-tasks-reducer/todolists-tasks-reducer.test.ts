import {TaskType, TodoListType} from "../../app/App";


import {v1} from "uuid";
import {addTodoListAC, todolistsReducer} from "../todolist-reducer/todolists-reducer";
import {tasksReducer} from "../task-reducer/task-reducer";


let IdForFirstTodoList:string;
let IdForSecondTodoList:string;
let IdForThirdTodoList:string;
let startStateTodoLists:TodoListType[];
let startStateTasks:{[key: string]: TaskType[]};
let id :string;

beforeEach(()=>{
    IdForFirstTodoList = v1();
    IdForSecondTodoList = v1();
    IdForThirdTodoList = v1();
    id=v1();
    startStateTasks={

        [IdForFirstTodoList]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [IdForSecondTodoList]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [IdForThirdTodoList]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: id, title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };
     startStateTodoLists = [];



})

test('ids should be equals', () => {

    const action = addTodoListAC('new todo');

    const endStateTodoLists = todolistsReducer(startStateTodoLists,action);

    const endStateTasks = tasksReducer(startStateTasks,action);

expect(endStateTodoLists[0].id).toBe(action.payload.id);

expect(Object.keys(endStateTasks)[0]).toBe(action.payload.id);

expect(endStateTodoLists[0].id===Object.keys(endStateTasks)[0]).toBeTruthy();

});



test('new array should be added when new todolist is added', () => {


    const endState = tasksReducer(startStateTasks, addTodoListAC('new todolist'));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(4)
    expect(endState[newKey]).toEqual([])
});

