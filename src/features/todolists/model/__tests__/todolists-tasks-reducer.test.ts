import {v1} from "uuid";
import {addTodoListAC, TodoListDomainType, todolistsReducer} from "../todolist-reducer/todolists-reducer";
import {TaskDomainType, tasksReducer} from "../task-reducer/task-reducer";
import {StatusTask, TaskPriority} from "../api/todolists-api";


let IdForFirstTodoList:string;
let IdForSecondTodoList:string;
let IdForThirdTodoList:string;
let startStateTodoLists:TodoListDomainType[];
let startStateTasks:{[key: string]: TaskDomainType[]};
let id :string;

beforeEach(()=>{
    IdForFirstTodoList = v1();
    IdForSecondTodoList = v1();
    IdForThirdTodoList = v1();
    id=v1();
    startStateTasks={

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

