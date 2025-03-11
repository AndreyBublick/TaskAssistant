import React, { ChangeEvent, FC, memo, useContext, useMemo } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { Model, TaskType } from '../../../../../api/tasksApi.types';

import { TodolistContext } from 'common/contexts';
import { AppStatus, StatusTask } from 'common/enums';
import { EditableSpan } from 'common/components';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../../../api/tasksApi';
import styled from 'styled-components';
import type { DomainModel } from '../../../../../lib/types/types';
import { useGetTodolistsQuery } from '../../../../../api/todolistsApi';

type Props = {
  task: TaskType;
};

export const Task: FC<Props> = memo(({ task }) => {
  const { status, title } = task;
  const [changeTask] = useUpdateTaskMutation();
  const [removeTask] = useDeleteTaskMutation();

  const todoListId = useContext(TodolistContext);

  const { data } = useGetTodolistsQuery();

  const isDisabled = useMemo((): boolean => {
    const todolist = data?.find(td => td.id === todoListId);
    return todolist ? todolist.status === AppStatus.loading : false;
  }, [data, todoListId]);

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
          disabled={isDisabled}
        />
        <EditableSpan disabled={isDisabled} changeString={changeString} title={title} />
      </div>
      <IconButton disabled={isDisabled} aria-label="delete" size="medium" onClick={removeTaskHandler}>
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
