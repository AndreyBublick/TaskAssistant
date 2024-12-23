import {v1} from "uuid";

import {TaskType, TodoListType} from "../../App";
import {
    addTaskAC,

    changeStatusTaskAC,
    changeTitleTaskAC, removeAllTasksAC,
    removeTaskAC,
    taskReduce
} from "./task-reduce";
import {addTodoListAC, removeTodoListAC, todoListsReduce} from "../todolist-reduce/todolists-reduce";

test('should remove task',()=>{

    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();



    const id = v1();


    const todoTasks:{ [key: string]: TaskType[] } ={

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

    expect(todoTasks[IdForThirdTodoList].length).toBe(6);
    const endState = taskReduce(todoTasks,removeTaskAC(IdForThirdTodoList,id));
expect(endState[IdForThirdTodoList].length).toBe(5);
expect(endState[IdForThirdTodoList][3].title).toBe("Rest API");
expect(endState[IdForThirdTodoList][4].title).toBe("GraphQL2");
expect(endState[IdForThirdTodoList][5]).toBe(undefined);
});
test('should add task',()=>{

    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();

const titleNewTask = 'new title';


    const todoTasks:{ [key: string]: TaskType[] } ={

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
            {id: v1(), title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };

    expect(todoTasks[IdForSecondTodoList].length).toBe(6);

    const endState = taskReduce(todoTasks,addTaskAC(IdForSecondTodoList,titleNewTask));

expect(endState[IdForFirstTodoList].length).toBe(6);
expect(endState[IdForSecondTodoList].length).toBe(7);
expect(endState[IdForSecondTodoList][0].title).toBe(titleNewTask);
expect(endState[IdForThirdTodoList].length).toBe(6);


});
test('should change task isDone status',()=>{

    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();


    const id = v1();


    const todoTasks:{ [key: string]: TaskType[] } ={

        [IdForFirstTodoList]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: id, title: "Rest API", isDone: false},
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
            {id: v1(), title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };


    expect(todoTasks[IdForSecondTodoList][3].isDone).toBe(false);
    const endState = taskReduce(todoTasks,changeStatusTaskAC(IdForFirstTodoList,id,true));
    expect(endState[IdForSecondTodoList][0].isDone).toBe(true);



});
test('should change task title',()=>{

    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();


    const id = v1();

   const newTitle = 'new our title'


    const todoTasks:{ [key: string]: TaskType[] } ={

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
            {id: id, title: "GraphQL", isDone: false},],
        [IdForThirdTodoList]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };

    const task = todoTasks[IdForSecondTodoList][todoTasks[IdForSecondTodoList].length-1];

    expect(task.title).toBe("GraphQL");
    expect(task.id).toBe(id);

    const endState = taskReduce(todoTasks,changeTitleTaskAC(IdForSecondTodoList,id,newTitle));

    expect(endState[IdForSecondTodoList][5].title).toBe(newTitle);
    expect(endState[IdForSecondTodoList][5].id).toBe(id);



});
test('should delete tasks by ID TodoLists ',()=>{

    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();

    const todoTasks:{ [key: string]: TaskType[] } ={

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
            {id: v1(), title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };

    expect(Object.keys(todoTasks).length).toBe(3);
    const endState = taskReduce(todoTasks,removeTodoListAC(IdForFirstTodoList));
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[IdForFirstTodoList]).toBe(undefined);

});

test('should added new array in tasks width new todolist',()=>{


    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();

    const todoLists: TodoListType[] = [
        {id: IdForFirstTodoList, filter: 'all', title: 'todo all'},
        {id: IdForSecondTodoList, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTodoList, filter: 'active', title: 'todo active'},
    ];
    const todoTasks:{ [key: string]: TaskType[] } ={

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
            {id: v1(), title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };

    const action = addTodoListAC('new Todo');

const endStateTodoLists = todoListsReduce(todoLists,action);
const endStateNewTodoListTasks = taskReduce(todoTasks,action);



 expect(Object.keys(endStateNewTodoListTasks).length).toBe(4);
 expect(endStateNewTodoListTasks[Object.keys(endStateNewTodoListTasks)[0]].length).toBe(0);
 expect(endStateNewTodoListTasks[Object.keys(endStateNewTodoListTasks)[0]]).toEqual([]);
});



test('should delete all the tasks in a todolist',()=>{


    const IdForFirstTodoList = v1();
    const IdForSecondTodoList = v1();
    const IdForThirdTodoList = v1();


    const todoTasks:{ [key: string]: TaskType[] } ={

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
            {id: v1(), title: "GraphQL1", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},],

    };


const endState = taskReduce(todoTasks,removeAllTasksAC(IdForSecondTodoList));

    expect(endState[IdForFirstTodoList].length > 0).toBeTruthy();
    expect(endState[IdForSecondTodoList]).toEqual([]);
    expect(endState[IdForSecondTodoList].length).toBe(0);
    expect(endState[IdForThirdTodoList].length > 0).toBeTruthy();

});



