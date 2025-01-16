import {v1} from "uuid";

import {TaskType} from "../app/App";

import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC, removeAllTasksAC,
    removeTaskAC,
    tasksReducer
} from "../store/task-reducer/task-reducer";
import { removeTodoListAC} from "../store/todolist-reducer/todolists-reducer";

let IdForFirstTodoList:string;
let IdForSecondTodoList:string;
let IdForThirdTodoList:string;
let todoTasks:{ [key: string]: TaskType[] } = {};
let id :string;

beforeEach(()=>{
    IdForFirstTodoList = v1();
    IdForSecondTodoList = v1();
    IdForThirdTodoList = v1();
    id=v1();
    todoTasks={

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


})

test('should remove task',()=>{

    expect(todoTasks[IdForThirdTodoList].length).toBe(6);
    const endState = tasksReducer(todoTasks,removeTaskAC(IdForThirdTodoList,id));
expect(endState[IdForThirdTodoList].length).toBe(5);
expect(endState[IdForThirdTodoList][3].title).toBe("Rest API");
expect(endState[IdForThirdTodoList][4].title).toBe("GraphQL2");
expect(endState[IdForThirdTodoList][5]).toBe(undefined);
});
test('should add task',()=>{

const titleNewTask = 'new title';

    expect(todoTasks[IdForSecondTodoList].length).toBe(6);

    const endState = tasksReducer(todoTasks,addTaskAC({idTodoList:IdForSecondTodoList,title:titleNewTask}));

expect(endState[IdForFirstTodoList].length).toBe(6);
expect(endState[IdForSecondTodoList].length).toBe(7);
expect(endState[IdForSecondTodoList][0].title).toBe(titleNewTask);
expect(endState[IdForThirdTodoList].length).toBe(6);


});
test('should change task isDone status',()=>{

    expect(todoTasks[IdForSecondTodoList][3].isDone).toBe(false);/*idTodoList: string, id: string, isDone: boolean*/
    const endState = tasksReducer(todoTasks,changeStatusTaskAC({idTodoList:IdForFirstTodoList,id,isDone:true}));
    expect(endState[IdForSecondTodoList][0].isDone).toBe(true);



});
test('should change task title',()=>{

   const newTitle = 'new our title';

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
                                                                            /*idTodoList: string, id: string, title: string*/
    const endState = tasksReducer(todoTasks,changeTitleTaskAC({idTodoList:IdForSecondTodoList,id,title:newTitle}));

    expect(endState[IdForSecondTodoList][5].title).toBe(newTitle);
    expect(endState[IdForSecondTodoList][5].id).toBe(id);



});
test('should delete tasks by ID TodoLists',()=>{



    expect(Object.keys(todoTasks).length).toBe(3);
    const endState = tasksReducer(todoTasks,removeTodoListAC(IdForFirstTodoList));
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[IdForFirstTodoList]).toBe(undefined);

});
test('should delete all the tasks in a todolist',()=>{

const endState = tasksReducer(todoTasks,removeAllTasksAC(IdForSecondTodoList));

    expect(endState[IdForFirstTodoList].length > 0).toBeTruthy();
    expect(endState[IdForSecondTodoList]).toEqual([]);
    expect(endState[IdForSecondTodoList].length).toBe(0);
    expect(endState[IdForThirdTodoList].length > 0).toBeTruthy();

});




