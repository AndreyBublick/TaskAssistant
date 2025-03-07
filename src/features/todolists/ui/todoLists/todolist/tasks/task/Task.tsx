import React, { ChangeEvent, FC, memo, useContext } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { Model, TaskType } from '../../../../../api/tasksApi.types';
import { selectTodoListStatus } from '../../../../../model/todolistSlice/todolistsSlice';
import { TodolistContext } from 'common/contexts';
import { useAppSelector } from 'common/hooks';
import { AppStatus, StatusTask } from 'common/enums';
import { EditableSpan } from 'common/components';
import { DomainModel } from '../../../../../model/tasksSlice/tasksSlice';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../../../api/tasksApi';
import styled from 'styled-components';

type Props = {
  task: TaskType;
};

export const Task: FC<Props> = memo(({ task }) => {
  const { status, title } = task;
  const [changeTask] = useUpdateTaskMutation();
  const [removeTask] = useDeleteTaskMutation();

  const todoListId = useContext(TodolistContext);

  const todoStatus = useAppSelector(state => selectTodoListStatus(state, todoListId));

  const changeString = (title: string) => {
    changeTaskHandler({ title });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskHandler({ status: e.currentTarget.checked ? StatusTask.Completed : StatusTask.New });
  };
  const removeTaskHandler = () => {
    removeTask({ todoListId, id: task.id });
  };

  const changeTaskHandler = (domainModal: DomainModel) => {
    const model: Model = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...domainModal,
    };
    changeTask({ todoListId, taskId: task.id, model });
  };

  return (
    <TaskStyled style={{ opacity: `${status === StatusTask.Completed ? 0.5 : 1}` }}>
      <div>
        <Checkbox
          checked={status === StatusTask.Completed}
          onChange={onChangeHandler}
          inputProps={{ 'aria-label': 'controlled' }}
          disabled={todoStatus === AppStatus.loading}
        />
        <EditableSpan disabled={todoStatus === AppStatus.loading} changeString={changeString} title={title} />
      </div>
      <IconButton
        disabled={todoStatus === AppStatus.loading}
        aria-label="delete"
        size="medium"
        onClick={removeTaskHandler}>
        <Delete fontSize="inherit" />
      </IconButton>
    </TaskStyled>
  );
});

const TaskStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
