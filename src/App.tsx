import React, {FC, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed" | 'three';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string,
    filter: FilterValuesType,
    title: string,
};


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




    return (
        <div className="App">

            {todoLists.map(todoList => {

                const changeFilter = (value: FilterValuesType,idTodoLists:string) => {

                    setTodoLists( prev=> prev.map(todoList=> todoList.id===idTodoLists ? {...todoList,filter:value} : todoList));

                }/*---------------------------*/

                /*const tasksForTodoList = useMemo(() => {

                    switch (filter) {
                        case "active": {
                            return tasks.filter(t => !t.isDone);

                        }
                        case "completed": {
                            return tasks.filter(t => t.isDone/!* === true*!/);

                        }
                        case "three": {
                            return tasks.filter((t, index) => index < 3);

                        }
                        default: {
                            return tasks;
                        }
                    }
                    ;


                }, [filter, tasks]);*/


                const removeTask = (id: string,idTodoLists:string) => {

                    setTodoTasks({...todoTasks,[idTodoLists]:todoTasks[idTodoLists].filter(list => list.id !== id)});

                    /* setTasks(todoTasks[idTodoLists].filter(t => t.id !== id));*/

                    /*
                     let filteredTasks = tasks.filter(t => t.id !== id);
                     setTasks(filteredTasks);*/
                }/*------------------*/

                const addNewTask = (title: string,idTodoLists:string) => {

                    setTodoTasks( prev=> ({...prev, [idTodoLists]: [{id: v1(), title: title, isDone: false},...prev[idTodoLists]] }));


                    /*setTasks(prev => [{id: v1(), title: title, isDone: false}, ...prev]);*/
                };/*-----------*/

                const changeTaskDone = (id: string, isDone: boolean,idTodoLists:string) => {


                    setTodoTasks(prev=> ({...prev,[idTodoLists]:prev[idTodoLists].map(tL=> tL.id===id ? {...tL,isDone:isDone} : tL)}));

                    /*setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone} : task));*/
                };

                const removeAllTasks = (idTodoLists: string) => {
                    setTodoTasks(prev=>({...prev,[idTodoLists]:[]}));
                };

                const deleteTodoList = (idTodoLists: string)=>{

                    delete todoTasks[idTodoLists];
                    setTodoLists( prev=>prev.filter(tL=> tL.id !== idTodoLists));
                };
                    let tasksForTodoList = [];

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
                            tasksForTodoList = todoTasks[todoList.id];
                            break;
                        }
                    };


                    /*const tasksForTodoList = todoTasks[todoList.id].filter(tT=> todoList.filter );*/


                    return <Todolist key={todoList.id} id={todoList.id} filter={todoList.filter} changeTaskDone={changeTaskDone}
                                     tasks={tasksForTodoList}
                                     addNewTask={addNewTask}
                                     changeFilter={changeFilter}
                                     removeTask={removeTask}
                                     title={todoList.title}
                                     removeAllTasks={removeAllTasks}
                                     deleteTodoList={deleteTodoList}
                    />
                }
            )}


        </div>
    );
}
