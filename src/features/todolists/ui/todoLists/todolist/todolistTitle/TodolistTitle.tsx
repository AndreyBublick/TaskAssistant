import styled from 'styled-components';

import React, { FC, memo, useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { TodoListDomain } from '../../../../model/todolistSlice/todolistsSlice';
import { AppStatus } from 'common/enums';
import { EditableSpan } from 'common/components';
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '../../../../api/todolistsApi';

type Props = {
  todoList: TodoListDomain;
};

export const TodolistTitle: FC<Props> = memo(({ todoList }) => {
  const [deleteTodoList] = useRemoveTodolistMutation();
  const [updateTodoListTitle] = useUpdateTodolistTitleMutation();
  const isDisabled = todoList.status === AppStatus.loading;

  const deleteTodoListHandler = useCallback(() => {
    deleteTodoList(todoList.id);
  }, [deleteTodoList, todoList.id]);

  const updateTodoListTitleHandler = useCallback(
    (title: string) => {
      updateTodoListTitle({ id: todoList.id, title });
    },
    [updateTodoListTitle, todoList.id],
  );

  return (
    <FlexWrapper>
      <TodoTitle>
        <h3>
          <EditableSpan changeString={updateTodoListTitleHandler} title={todoList.title} disabled={isDisabled} />
        </h3>
      </TodoTitle>
      <IconButton
        disabled={isDisabled}
        aria-label="delete"
        size="large"
        onClick={deleteTodoListHandler}
        sx={{ position: 'absolute', top: -6, right: -8 }}>
        <Delete fontSize="inherit" />
      </IconButton>
    </FlexWrapper>
  );
});

export const TodoTitle = styled.div`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;

  input {
    font-size: 22px;
  }

  h3 {
    margin: 0;

    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
