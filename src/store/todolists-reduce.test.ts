import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {todoListsReduce} from "./todolists-reduce";


test('correct todolist should be removed', () => {

    const IdForFirstTask = v1();
    const IdForSecondTask = v1();
    const IdForThirdTask = v1();

    const todoLists: TodoListType[] = [
        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},
    ];
    const endState = todoListsReduce(todoLists,{type:'REMOVE-TODOLIST',id:IdForSecondTask});

    expect(endState.length).toBe(2);
    expect(endState[1].id).toBe(IdForThirdTask);
});
test('correct todolist should be added', () => {

    const IdForFirstTask = v1();
    const IdForSecondTask = v1();
    const IdForThirdTask = v1();

    const todoLists: TodoListType[] = [
        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},
    ];
    const title = 'NEW TODO';
    const endState = todoListsReduce(todoLists,{type:'ADD-TODOLIST',title:title});

    expect(endState.length).toBe(4);
    expect(endState[3].title).toBe(title);
    expect(endState[3].filter).toBe('all');
});
test('correct todolist should change its title', () => {

    const IdForFirstTask = v1();
    const IdForSecondTask = v1();
    const IdForThirdTask = v1();

    const todoLists: TodoListType[] = [
        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},
    ];
    const newTitle = 'NewTitlE';

    const action = {type:'CHANGE-TODOLIST-TITLE',payload:{id:IdForThirdTask,title:newTitle}};

    const endState = todoListsReduce(todoLists,action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
});
test('correct todolist should change its filter', () => {

    const IdForFirstTask = v1();
    const IdForSecondTask = v1();
    const IdForThirdTask = v1();

    const todoLists: TodoListType[] = [
        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},
    ];
    const newFilterValue:FilterValuesType = "active";

    const action = {type:'CHANGE-TODOLIST-FILTER',payload:{id:IdForFirstTask,filter:newFilterValue}};


    expect(todoLists[0].filter).toBe('all');
    const endState = todoListsReduce(todoLists,action);
    expect(endState.length).toBe(3);
    expect(endState[1].filter).toBe('completed');
    expect(endState[2].filter).toBe('active');
});