import React, { memo, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Todolist } from './todolist/Todolist';

import { fetchTodoListsTC, getTodoLists } from '../../model/todolistSlice/todolistsSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks/Hooks';

export const TodoLists = memo(() => {
  const todoLists = useAppSelector(getTodoLists);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodoListsTC());
  }, [dispatch]);

  const todoListsMapped = todoLists.map(todoList => {
    return (
      <Paper key={todoList.id}>
        <Todolist todoList={todoList} />
      </Paper>
    );
  });

  return <>{todoListsMapped}</>;
});
