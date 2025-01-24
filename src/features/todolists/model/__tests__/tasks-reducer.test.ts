import {v1} from "uuid";

import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeAllTasksAC,
    removeTaskAC,
    tasksReducer,
    TaskDomainType
} from "../task-reducer/task-reducer";
import {removeTodoListAC} from "../todolist-reducer/todolists-reducer";
import {StatusTask, TaskPriority} from "../api/todolists-api";

let IdForFirstTodoList:string;
let IdForSecondTodoList:string;
let IdForThirdTodoList:string;
let todoTasks:{ [key: string]: TaskDomainType[] } = {};
let id :string;

beforeEach(()=>{
    IdForFirstTodoList = v1();
    IdForSecondTodoList = v1();
    IdForThirdTodoList = v1();
    id=v1();

    todoTasks={

        [IdForFirstTodoList]: [
            {id: v1(), title: "HTML&CSS", status: StatusTask.Completed,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "JS", status: StatusTask.Completed,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "ReactJS", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "Rest API", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "GraphQL", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "GraphQL", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},],
        [IdForSecondTodoList]: [
            {id: v1(), title: "HTML&CSS", status: StatusTask.Completed,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "JS", status: StatusTask.Completed,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "ReactJS", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "Rest API", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "GraphQL", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "GraphQL", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},],
        [IdForThirdTodoList]: [
            {id: v1(), title: "HTML&CSS", status: StatusTask.Completed,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "JS", status: StatusTask.Completed,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "ReactJS", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "Rest API", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: id, title: "GraphQL1", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},
            {id: v1(), title: "GraphQL2", status: StatusTask.New,order:0,deadline:'',addedDate:'',startDate:'',todoListId:'',priority:TaskPriority.Low,description:''},],

    };


})

test('should remove task',()=>{

    expect(todoTasks[IdForThirdTodoList].length).toBe(6);
    const endState = tasksReducer(todoTasks,removeTaskAC( {idTodoList:IdForThirdTodoList, id}));
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
test('should change task status status',()=>{

    expect(todoTasks[IdForSecondTodoList][3].status).toBe(StatusTask.New);/*idTodoList: string, id: string, status: boolean*/
    const endState = tasksReducer(todoTasks,changeStatusTaskAC({idTodoList:IdForFirstTodoList,id,status:StatusTask.Completed}));
    expect(endState[IdForSecondTodoList][0].status).toBe(StatusTask.Completed);



});
test('should change task title',()=>{

   const newTitle = 'new our title';



    const task = todoTasks[IdForThirdTodoList][todoTasks[IdForSecondTodoList].length-2];

    expect(task.title).toBe("GraphQL1");
    expect(task.id).toBe(id);
                                                                            /*idTodoList: string, id: string, title: string*/
    const endState = tasksReducer(todoTasks,changeTitleTaskAC({idTodoList:IdForThirdTodoList,id,title:newTitle}));

    expect(endState[IdForThirdTodoList][4].title).toBe(newTitle);
    expect(endState[IdForThirdTodoList][4].id).toBe(id);



});
test('should delete tasks by ID TodoLists',()=>{



    expect(Object.keys(todoTasks).length).toBe(3);
    const endState = tasksReducer(todoTasks,removeTodoListAC(IdForFirstTodoList));
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[IdForFirstTodoList]).toBe(undefined);

});
test('should delete all the tasks in a todolist',()=>{

const endState = tasksReducer(todoTasks,removeAllTasksAC({idTodoList:IdForSecondTodoList}));

    expect(endState[IdForFirstTodoList].length > 0).toBeTruthy();
    expect(endState[IdForSecondTodoList]).toEqual([]);
    expect(endState[IdForSecondTodoList].length).toBe(0);
    expect(endState[IdForThirdTodoList].length > 0).toBeTruthy();

});




