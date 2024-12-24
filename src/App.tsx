import React, {FC, useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {AddItemForm} from "./components/addItemForm/AddItemForm";
import styled from "styled-components";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid2, Paper} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {
    addTodoListAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodoListAC,
} from "./store/todolist-reduce/todolists-reduce";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";


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


export const App: FC = () => {

    const todoLists = useSelector<StateType, TodoListType[]>(state => state.todoLists);



    const dispatch = useDispatch();

    const addNewTodoList = useCallback((titleTodo: string) => {
        dispatch(addTodoListAC(titleTodo));
    }, []);

    const changeFilter = (value: FilterValuesType, idTodoLists: string) => {
        dispatch(changeTodolistFilterAC(idTodoLists, value));
    }
    const deleteTodoList = (idTodoLists: string) => {
        dispatch(removeTodoListAC(idTodoLists));
    };
    const changeTitleTodoList = (idTodo: string, title: string) => {

        dispatch(changeTodolistTitleAC(idTodo, title));

    };



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




                            return <Paper key={todoList.id}>
                                <Todolist id={todoList.id}
                                          filter={todoList.filter}
                                          title={todoList.title}

                                         /* tasks={tasksForTodoList}
                                          addNewTask={addNewTask}*/
                                          changeFilter={changeFilter}
                                         /* removeTask={removeTask}
                                          changeTaskDone={changeTaskDone}
                                          removeAllTasks={removeAllTasks}*/
                                          deleteTodoList={deleteTodoList}
                                          changeTitleTodoList={changeTitleTodoList}
                                         /* changeTaskTitle={changeTaskTitle}*/

                                />
                            </Paper>
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

