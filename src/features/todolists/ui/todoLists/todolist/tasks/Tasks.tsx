import { FilterValuesType } from '../../../../model/todolistSlice/todolistsSlice';
import React, { FC, memo, useContext, useEffect, useMemo } from 'react';
import { TodolistContext } from 'common/contexts';
import { StatusTask } from 'common/enums';
import styled from 'styled-components';
import { Task } from './task/Task';
import { useGetTasksQuery } from '../../../../api/tasksApi';
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton/TasksSkeleton';
import { setAppError } from 'app/appSlice';
import { useAppDispatch } from 'common/hooks';

type PropsType = {
  filter: FilterValuesType;
};

export const Tasks: FC<PropsType> = memo(({ filter }) => {
  const id = useContext(TodolistContext);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useGetTasksQuery(id);

  const tasks = data?.items;
  useEffect(() => {
    if (error) {
      if ('status' in error) {
        //  FetchBaseQueryError
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
        dispatch(setAppError({ error: errMsg }));
      } else {
        // SerializedError
        dispatch(setAppError({ error: error.message ? error.message : 'Some error occurred.' }));
      }
    }
  }, [dispatch, error]);
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
