import React, {FC, useCallback} from 'react';
import './App.css';
import {Todolist} from "../components/todoLists/todolist/Todolist";

import {AddItemForm} from "../components/addItemForm/AddItemForm";
import styled from "styled-components";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid2, Paper} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "../store/todolist-reducer/todolists-reducer";

import {useAppDispatch, useAppSelector} from "../hooks/Hooks";
import {selectorGetTodoLists} from "../store/selectors/todoLists-selectors";
import {TodoLists} from "../components/todoLists/TodoLists";
import {Header} from "./Header";
import {Main} from "./Main";


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

    return (
        <div className="App">
            <Header/>
            <Main/>

        </div>
    );
}


