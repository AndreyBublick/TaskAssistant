import React, { FC, memo, useContext, useMemo, useState } from 'react';
import { TodolistContext } from 'common/contexts';
import { StatusTask } from 'common/enums';
import styled from 'styled-components';
import { Task } from './task/Task';
import { PAGE_SIZE, useGetTasksQuery } from '../../../../api/tasksApi';
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton/TasksSkeleton';
import type { FilterValues } from '../../../../lib/types/types';
import { Pagination } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

type PropsType = {
  filter: FilterValues;
};

export const Tasks: FC<PropsType> = memo(({ filter }) => {
  const id = useContext(TodolistContext);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } });

  const tasks = data?.items;
  const totalCount = data?.totalCount;

  const counts = totalCount ? Math.ceil(totalCount / PAGE_SIZE) : 1;

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

  const onChangePaginationPage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <>
      {isLoading ? (
        <TasksSkeleton />
      ) : tasksForTodoList.length > 0 ? (
        <>
          <List>{tasksForTodoListMapped}</List>
          <Grid2 display={'flex'} justifyContent={'center'} sx={{ marginBottom: 2 }}>
            <Pagination
              size={'small'}
              count={counts}
              color={'primary'}
              variant={'text'}
              siblingCount={1}
              shape="rounded"
              onChange={onChangePaginationPage}
            />
          </Grid2>
        </>
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
