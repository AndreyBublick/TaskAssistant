import React, { FC, memo } from "react";

import styled from "styled-components";

import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Tasks } from "./tasks/Tasks";
import { TodolistContext } from "common/contexts/TodolistContext";
import { FilterButtons } from "./filterButtons/FilterButtons";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";
import { useTodolist } from "common/hooks/useTodolist";
import { TodoListDomainType } from "../../../model/todolist-reducer/todolists-reducer";
import { AddItemForm } from "common/components/addItemForm/AddItemForm";

type PropsType = {
  todoList: TodoListDomainType;
};

export const Todolist: FC<PropsType> = memo(({ todoList }) => {
  const { id, title, filter } = todoList;

  const { deleteTodoList, changeTitleTodoList, addNewTask, removeAllTasksHandler } = useTodolist(id);

  return (
    <TodolistContext.Provider value={id}>
      <TodolistStyled>
        <FlexWrapper>
          <TodolistTitle onChange={changeTitleTodoList} title={title} />

          <IconButton aria-label="delete" size="large" onClick={deleteTodoList}>
            <Delete fontSize="inherit" />
          </IconButton>
        </FlexWrapper>
        <AddItemForm callBack={addNewTask} />
        <Tasks filter={filter} />
        <Button title={"delete all"} variant={"contained"} onClick={removeAllTasksHandler}>
          delete all
        </Button>
        <FilterButtons filter={filter} />
      </TodolistStyled>
    </TodolistContext.Provider>
  );
});

const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const TodolistStyled = styled.div`
  padding: 15px;
`;
