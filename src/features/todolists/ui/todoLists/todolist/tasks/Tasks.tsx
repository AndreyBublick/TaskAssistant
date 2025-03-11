import React, { FC, memo, useContext, useMemo } from 'react';
import { TodolistContext } from 'common/contexts';
import { StatusTask } from 'common/enums';
import styled from 'styled-components';
import { Task } from './task/Task';
import { useGetTasksQuery } from '../../../../api/tasksApi';
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton/TasksSkeleton';
import type { FilterValues } from '../../../../lib/types/types';

type PropsType = {
  filter: FilterValues;
};

export const Tasks: FC<PropsType> = memo(({ filter }) => {
  const id = useContext(TodolistContext);

  const { data, isLoading } = useGetTasksQuery(id);

  const tasks = data?.items;

  const tasksForTodoList = useMemo(() => {
    if (!tasks) return [];
    switch (filter) {
      case 'active': {
        return tasks.filter(t => t.status === StatusTask.New);
      }
      case 'completed': {
        return tasks.filter(t => t.status === StatusTask.Completed);
      }
      case 'first 3': {
        return tasks.filter((_, index) => index < 3);
      }
      default: {
        return tasks;
      }
    }
  }, [filter, tasks]);

  const tasksForTodoListMapped = tasksForTodoList.map(t => <Task task={t} key={t.id} />);

  return (
    <>
      {isLoading ? (
        <TasksSkeleton />
      ) : tasksForTodoList.length > 0 ? (
        <List>{tasksForTodoListMapped}</List>
      ) : (
        <EmptyTasks>Задачи отсутствуют</EmptyTasks>
      )}
    </>
  );
});

const List = styled.ul`
  padding: 0;
`;
const EmptyTasks = styled.span`
  font-size: 22px;
  display: block;
  font-weight: 700;
  line-height: 3;
`;
