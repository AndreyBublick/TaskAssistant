import React, { FC, memo } from 'react';

import styled from 'styled-components';

import { Box, Button, Paper } from '@mui/material';
import { Tasks } from './tasks/Tasks';
import { TodolistContext } from 'common/contexts/TodolistContext';
import { FilterButtons } from './filterButtons/FilterButtons';
import { TodolistTitle } from './todolistTitle/TodolistTitle';
import { TodoListDomain } from '../../../model/todolistSlice/todolistsSlice';
import { useTodolist } from 'common/hooks';
import { AddItemForm } from 'common/components';
import { AppStatus } from 'common/enums';
import { useCreateTaskMutation } from '../../../api/tasksApi';

type PropsType = {
  todoList: TodoListDomain;
};

export const Todolist: FC<PropsType> = memo(({ todoList }) => {
  const { id, filter, status } = todoList;
  const [addNewTask] = useCreateTaskMutation();

  const { removeAllTasksHandler } = useTodolist(id);

  const addNewTaskHandler = (title: string) => {
    addNewTask({ todoListId: todoList.id, title });
  };
  return (
    <TodolistContext.Provider value={id}>
      <TodolistStyled>
        <TodolistTitle todoList={todoList} />

        <AddItemForm label={'New Task'} status={status === AppStatus.loading} callBack={addNewTaskHandler} />
        <Tasks filter={filter} />
        <Box sx={{ textAlign: 'right' }}>
          <Button title={'delete all tasks'} variant={'contained'} onClick={removeAllTasksHandler}>
            delete all tasks
          </Button>
        </Box>

        <FilterButtons filter={filter} />
      </TodolistStyled>
    </TodolistContext.Provider>
  );
});

const TodolistStyled = styled(Paper)`
  padding: 15px;
  width: 340px;
  position: relative;
`;
