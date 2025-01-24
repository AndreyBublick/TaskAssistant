import React, {memo} from 'react';
import {Paper} from "@mui/material";
import {Todolist} from "./todolist/Todolist";
import { useAppSelector} from "../../../../common/hooks/Hooks";
import {selectorGetTodoLists} from "../../model/selectors/todoLists-selectors";


export const TodoLists = memo (() => {

    const todoLists = useAppSelector(selectorGetTodoLists);

    const todoListsMapped = todoLists.map(todoList => {


            return <Paper key={todoList.id}>
                <Todolist todoList={todoList}/>
            </Paper>
        }
    );

    return <>
        {todoListsMapped}
    </>
});

