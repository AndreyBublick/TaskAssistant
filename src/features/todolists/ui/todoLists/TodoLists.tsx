import React, { memo } from 'react';
import { Paper } from '@mui/material';
import { Todolist } from './todolist/Todolist';
import { useGetTodolistsQuery } from '../../api/todolistsApi';

export const TodoLists = memo(() => {
  const { data: todolists } = useGetTodolistsQuery();

  const todoListsMapped = todolists?.map(todoList => {
    return (
      <Paper key={todoList.id}>
        <Todolist todoList={todoList} />
      </Paper>
    );
  });

  return <>{todoListsMapped}</>;
});
