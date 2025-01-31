import React, { memo, useEffect } from "react";
import { Paper } from "@mui/material";
import { Todolist } from "./todolist/Todolist";

import { selectorGetTodoLists } from "../../model/selectors/todoLists-selectors";
import { getTodoListsTC } from "../../model/todolist-reducer/todolists-reducer";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";

export const TodoLists = memo(() => {
  const todoLists = useAppSelector(selectorGetTodoLists);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodoListsTC());
  }, [dispatch]);

  const todoListsMapped = todoLists.map((todoList) => {
    return (
      <Paper key={todoList.id}>
        <Todolist todoList={todoList} />
      </Paper>
    );
  });

  return <>{todoListsMapped}</>;
});
