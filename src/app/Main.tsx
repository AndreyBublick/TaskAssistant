import { Container, Grid2 } from '@mui/material';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'common/hooks';
import { addTodoListTC } from '../features/todolists/model/todolistSlice/todolistsSlice';
import { AddItemForm } from 'common/components';
import { TodoLists } from '../features/todolists/ui/todoLists/TodoLists';
import styled from 'styled-components';

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
        <AddItemForm label={'new TodoList'} callBack={addNewTodoList} />
      </AddItemFormWrapper>
      <Grid2 container spacing={2}>
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
