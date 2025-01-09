import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../../App";
import {

    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer,
} from "./todolists-reducer";

let IdForFirstTask:string;
let IdForSecondTask:string;
let IdForThirdTask :string;

let todoLists: TodoListType[];

beforeEach(()=>{
     IdForFirstTask = v1();
     IdForSecondTask = v1();
     IdForThirdTask = v1();

     todoLists = [
        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},
    ];
});


test('correct todolist should be removed', () => {



    const endState = todolistsReducer(todoLists,removeTodoListAC(IdForSecondTask));

    expect(endState.length).toBe(2);
    expect(endState[1].id).toBe(IdForThirdTask);
});
test('correct todolist should be added', () => {


    const title = 'NEW TODO';
    const endState = todolistsReducer(todoLists,addTodoListAC(title));

    expect(endState.length).toBe(4);
    expect(endState[3].title).toBe(title);
    expect(endState[3].filter).toBe('all');
});
test('correct todolist should change its title', () => {


    const newTitle = 'NewTitlE';



    const endState = todolistsReducer(todoLists,changeTodolistTitleAC(IdForThirdTask,newTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
});
test('correct todolist should change its filter', () => {


    const newFilterValue:FilterValuesType = "active";




    expect(todoLists[0].filter).toBe('all');
    const endState = todolistsReducer(todoLists,changeTodolistFilterAC(IdForFirstTask,newFilterValue));
    expect(endState.length).toBe(3);
    expect(endState[1].filter).toBe('completed');
    expect(endState[2].filter).toBe('active');
});


