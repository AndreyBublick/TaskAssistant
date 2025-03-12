import styled from 'styled-components';

import React, { FC, memo, useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { AppStatus } from 'common/enums';
import { EditableSpan } from 'common/components';
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '../../../../api/todolistsApi';
import { useAppDispatch } from 'common/hooks';
import type { TodoListDomain } from '../../../../lib/types/types';

type Props = {
  todoList: TodoListDomain;
};

export const TodolistTitle: FC<Props> = memo(({ todoList }) => {
  const dispatch = useAppDispatch();
  const [deleteTodoList] = useRemoveTodolistMutation();
  const [updateTodoListTitle] = useUpdateTodolistTitleMutation();
  const isDisabled = todoList.status === AppStatus.loading;

  const updateQueryData = useCallback(
    (status: AppStatus) => {
      dispatch(
        todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
          const index = state.findIndex(tl => tl.id === todoList.id);
          if (index !== -1) {
            state[index].status = status;
          }
        }),
      );
    },
    [dispatch, todoList.id],
  );

  const deleteTodoListHandler = useCallback(() => {
    updateQueryData(AppStatus.loading);
    deleteTodoList(todoList.id)
      .unwrap()
      .catch(() => {
        updateQueryData(AppStatus.failed);
      });
  }, [deleteTodoList, todoList.id, updateQueryData]);

  const updateTodoListTitleHandler = useCallback(
    (title: string) => {
      updateQueryData(AppStatus.loading);
      updateTodoListTitle({ id: todoList.id, title })
        .unwrap()
        .then(() => {
          updateQueryData(AppStatus.succeeded);
        })
        .catch(() => {
          updateQueryData(AppStatus.failed);
        });
    },
    [updateTodoListTitle, todoList.id, updateQueryData],
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
