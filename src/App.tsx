import React, {FC, useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {AddItemForm} from "./components/addItemForm/AddItemForm";
import styled from "styled-components";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid2, Paper} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "./store/todolist-reducer/todolists-reducer";

import {useAppDispatch, useAppSelector} from "./hooks/Hooks";
import {selectorGetTodoLists} from "./store/selectors/todoLists-selectors";
import {TodoLists} from "./components/todoLists/TodoLists";


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

    const dispatch = useAppDispatch();





    const addNewTodoList = useCallback((titleTodo: string) => {
        dispatch(addTodoListAC(titleTodo));
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
                    <TodoLists />
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

