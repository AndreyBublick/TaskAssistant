import React, {memo} from 'react';
import {Paper} from "@mui/material";
import {Todolist} from "../../Todolist";
import { useAppSelector} from "../../hooks/Hooks";
import {selectorGetTodoLists} from "../../store/selectors/todoLists-selectors";


export const TodoLists = memo (() => {

    const todoLists = useAppSelector(selectorGetTodoLists);


    return <>
        {todoLists.map(todoList => {


                return <Paper key={todoList.id}>
                    <Todolist id={todoList.id}
                              filter={todoList.filter}
                              title={todoList.title}


                    />
                </Paper>
            }
        )}
    </>
});

