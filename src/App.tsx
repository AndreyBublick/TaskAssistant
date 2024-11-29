import React, {FC, useCallback, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";


export type FilterValuesType = "all" | "active" | "completed" | 'three';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string,
    filter: FilterValuesType,
    title: string,
};
/*
type TestType = {
    id: string,
    userFirstName: string,
    userLastName: string,
};
const arrayForAss: TestType[] = [
    {id: v1(), userFirstName: 'asd', userLastName: 'asd'},
    {
    id: v1(),
    userFirstName: 'asd',
    userLastName: 'asd'
},

];
type asdType = {
    [key:string]: TestType,
};


const makeAssociativeArray=(array:TestType[])=>{

  return array.reduce((acc:asdType,arrayItem:TestType)=>{
      acc[arrayItem.id] = arrayItem
        return acc;
    },{});

};

console.log(makeAssArray(arrayForAss));*/

export const App: FC = () => {
    const IdForFirstTask = v1();
    const IdForSecondTask = v1();
    const IdForThirdTask = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([

        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},

    ]);

    const [todoTasks, setTodoTasks] = useState<{ [key: string]: TaskType[] }>({

        [IdForFirstTask]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [IdForSecondTask]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [IdForThirdTask]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],

    });

    const addNewTodoList = useCallback((titleTodo:string)=>{

        const id= v1();
        setTodoTasks(p=>({...p,[id]:[]}));
        setTodoLists(p=>[{id:id, filter: 'all', title: titleTodo},...p]);

    },[]);
    return (
        <div className="App">
            <AddItemForm callBack={addNewTodoList} />
            {todoLists.map(todoList => {

                    let tasksForTodoList:TaskType[] = [];

                    const changeFilter = (value: FilterValuesType, idTodoLists: string) => {

                        setTodoLists(prev => prev.map(todoList => todoList.id === idTodoLists ? {
                            ...todoList,
                            filter: value
                        } : todoList));

                    }

                    const removeTask = (id: string, idTodoLists: string) => {

                        setTodoTasks({
                            ...todoTasks,
                            [idTodoLists]: todoTasks[idTodoLists].filter(list => list.id !== id)
                        });


                    }

                    const addNewTask = (title: string, idTodoLists: string) => {

                        setTodoTasks(prev => ({
                            ...prev,
                            [idTodoLists]: [{id: v1(), title: title, isDone: false}, ...prev[idTodoLists]]
                        }));


                    };

                    const changeTaskDone = (id: string, isDone: boolean, idTodoLists: string) => {


                        setTodoTasks(prev => ({
                            ...prev,
                            [idTodoLists]: prev[idTodoLists].map(tL => tL.id === id ? {...tL, isDone: isDone} : tL)
                        }));


                    };

                    const removeAllTasks = (idTodoLists: string) => {
                        setTodoTasks(prev => ({...prev, [idTodoLists]: []}));
                    };

                    const deleteTodoList = (idTodoLists: string) => {

                        delete todoTasks[idTodoLists];
                        setTodoLists(prev => prev.filter(tL => tL.id !== idTodoLists));
                    };

                    const changeTitleTodoList = (idTodo: string, title: string) => {

                        setTodoLists(p => p.map(tl => tl.id === idTodo ? {...tl, title: title} : tl));

                    };

                    const changeTaskTitle = (idTodoList: string, idTask: string, newTaskTitle: string) => {
                        setTodoTasks(p => ({
                            ...p,
                            [idTodoList]: p[idTodoList].map(t => t.id === idTask ? {...t, title: newTaskTitle} : t),


                        }));
                    };




                    switch (todoList.filter) {
                        case "active": {
                            tasksForTodoList = todoTasks[todoList.id].filter(t => !t.isDone);
                            break;
                        }
                        case "completed": {
                            tasksForTodoList = todoTasks[todoList.id].filter(t => t.isDone/* === true*/);
                            break;
                        }
                        case "three": {
                            tasksForTodoList = todoTasks[todoList.id].filter((t, index) => index < 3);
                            break;
                        }
                        default: {
                            console.log(todoList.id)
                            tasksForTodoList = todoTasks[todoList.id];

                            break;
                        }
                    }


                    return <Todolist key={todoList.id} id={todoList.id} filter={todoList.filter}
                                     changeTaskDone={changeTaskDone}
                                     tasks={tasksForTodoList}
                                     addNewTask={addNewTask}
                                     changeFilter={changeFilter}
                                     removeTask={removeTask}
                                     title={todoList.title}
                                     removeAllTasks={removeAllTasks}
                                     deleteTodoList={deleteTodoList}
                                     changeTitleTodoList={changeTitleTodoList}
                                     changeTaskTitle={changeTaskTitle}

                    />
                }
            )}


        </div>
    );
}
