import React, { memo } from 'react';
import { Grid2 } from '@mui/material';
import { Todolist } from './todolist/Todolist';
import { useGetTodolistsQuery } from '../../api/todolistsApi';
import styled from 'styled-components';

export const TodoLists = memo(() => {
  const { data: todolists } = useGetTodolistsQuery();

  const todoListsMapped = todolists?.map(todoList => {
    return <Todolist key={todoList.id} todoList={todoList} />;
  });

  return (
    <Wrapper>
      <Grid2 flexWrap={'nowrap'} alignItems={'start'} container spacing={2}>
        {todoListsMapped}
      </Grid2>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding-right: 8px;
`;
