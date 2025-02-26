import { Container, Grid2 } from '@mui/material';
import { memo, useCallback } from 'react';
import { AddItemForm } from 'common/components';
import { TodoLists } from '../features/todolists/ui/todoLists/TodoLists';
import styled from 'styled-components';
import { useAddTodolistMutation } from '../features/todolists/api/todolistsApi';

export const Main = memo(() => {
  const [addTodoList] = useAddTodolistMutation();

  const addNewTodoList = useCallback(
    (titleTodo: string) => {
      addTodoList(titleTodo);
    },
    [addTodoList],
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
