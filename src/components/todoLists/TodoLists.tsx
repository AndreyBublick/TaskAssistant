import React, {memo} from 'react';
import {Paper} from "@mui/material";
import {Todolist} from "./todolist/Todolist";
import { useAppSelector} from "../../hooks/Hooks";
import {selectorGetTodoLists} from "../../store/selectors/todoLists-selectors";


export const TodoLists = memo (() => {

    const todoLists = useAppSelector(selectorGetTodoLists);

    const todoListsMaped = todoLists.map(todoList => {


            return <Paper key={todoList.id}>
                <Todolist todoList={todoList}/>
            </Paper>
        }
    );

    return <>
        {todoListsMaped}
    </>
});

