import React, { memo, useCallback } from "react";
import { AddItemForm } from "common/components/addItemForm/AddItemForm";
import { Container, Grid2 } from "@mui/material";
import { TodoLists } from "../features/todolists/ui/todoLists/TodoLists";
import styled from "styled-components";
import { useAppDispatch } from "common/hooks/Hooks";
import { addTodoListTC } from "../features/todolists/model/todolist-reducer/todolists-reducer";

export const Main = memo(() => {
  const dispatch = useAppDispatch();

  const addNewTodoList = useCallback(
    (titleTodo: string) => {
      dispatch(addTodoListTC(titleTodo));
    },
    [dispatch],
  );

  return (
    <Container fixed>
      <AddItemFormWrapper>
        <AddItemForm callBack={addNewTodoList} />
      </AddItemFormWrapper>
      <Grid2 container={true} spacing={2}>
        <TodoLists />
      </Grid2>
    </Container>
  );
});

const AddItemFormWrapper = styled.div`
  & > div {
    margin-bottom: 30px;
  }
`;
