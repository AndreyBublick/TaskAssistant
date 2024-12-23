import React, {FC, useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import styled from "styled-components";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid2, Paper} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC, removeAllTasksAC,
    removeTaskAC,
    taskReduce
} from "./store/task-reduce/task-reduce";
import {
    addTodoListAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodoListAC,
    todoListsReduce
} from "./store/todolist-reduce/todolists-reduce";


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



export const AppWithReducers: FC = () => {
    const IdForFirstTask = v1();
    const IdForSecondTask = v1();
    const IdForThirdTask = v1();
    const [todoLists, dispatchTodoLists] = useReducer(todoListsReduce,[

        {id: IdForFirstTask, filter: 'all', title: 'todo all'},
        {id: IdForSecondTask, filter: 'completed', title: 'todo completed'},
        {id: IdForThirdTask, filter: 'active', title: 'todo active'},

    ]);

    const [todoTasks, dispatchTodoTasks] = useReducer(taskReduce,{

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

    const addNewTodoList = useCallback((titleTodo: string) => {

       const action = addTodoListAC(titleTodo);

        dispatchTodoLists(action);
        dispatchTodoTasks(action);


    }, []);
    return (
        <div className="App">
            <AppBarStyled position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBarStyled>
            <ContainerStyled fixed>
                <AddItemFormWrapper>
                    <AddItemForm callBack={addNewTodoList}/>
                </AddItemFormWrapper>
                <Grid2 container={true} spacing={2}>
                    {todoLists.map(todoList => {

                            let tasksForTodoList: TaskType[] = [];

                            const changeFilter = (value: FilterValuesType, idTodoLists: string) => {
                                dispatchTodoLists(changeTodolistFilterAC(idTodoLists,value));
                            }

                            const removeTask = (id: string, idTodoLists: string) => {
                                dispatchTodoTasks(removeTaskAC(id,idTodoLists));


                            }

                            const addNewTask = (title: string, idTodoLists: string) => {

                                dispatchTodoTasks(addTaskAC(idTodoLists,title));


                            };

                            const changeTaskDone = (id: string, isDone: boolean, idTodoLists: string) => {


                                dispatchTodoTasks(changeStatusTaskAC(idTodoLists,id,isDone));


                            };

                            const removeAllTasks = (idTodoLists: string) => {

                                dispatchTodoTasks(removeAllTasksAC(idTodoLists));


                            };

                            const deleteTodoList = (idTodoLists: string) => {



                                const action = removeTodoListAC(idTodoLists);

                                dispatchTodoLists(action);
                                dispatchTodoTasks(action);
                            };

                            const changeTitleTodoList = (idTodo: string, title: string) => {

                                dispatchTodoLists(changeTodolistTitleAC(idTodo,title));

                            };

                            const changeTaskTitle = (idTodoList: string, idTask: string, newTaskTitle: string) => {
                                dispatchTodoTasks(changeTitleTaskAC(idTodoList,idTask,newTaskTitle));
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
                                    
                                    tasksForTodoList = todoTasks[todoList.id];

                                    break;
                                }
                            }


                            return <Paper key={todoList.id}>
                                <Todolist id={todoList.id}
                                          filter={todoList.filter}
                                          title={todoList.title}

                                          tasks={tasksForTodoList}
                                          addNewTask={addNewTask}
                                          changeFilter={changeFilter}
                                          removeTask={removeTask}
                                          changeTaskDone={changeTaskDone}
                                          removeAllTasks={removeAllTasks}
                                          deleteTodoList={deleteTodoList}
                                          changeTitleTodoList={changeTitleTodoList}
                                          changeTaskTitle={changeTaskTitle}

                                /></Paper>
                        }
                    )}
                </Grid2>
            </ContainerStyled>


        </div>
    );
}

const AddItemFormWrapper = styled.div`
    & > div {
        align-self: flex-start;
    }
`;

const AppBarStyled = styled(AppBar)`
    margin-bottom: 30px;
`;

const ContainerStyled = styled(Container)`
margin: 0 auto;
`;

