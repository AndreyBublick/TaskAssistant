import React, { FC, memo, useCallback, useContext, useMemo, useState } from 'react';
import { TodolistContext } from 'common/contexts';
import { StatusTask } from 'common/enums';
import styled from 'styled-components';
import { Task } from './task/Task';
import { PAGE_SIZE, START_PAGE, useDeleteTaskMutation, useGetTasksQuery } from '../../../../api/tasksApi';
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton/TasksSkeleton';
import type { FilterValues } from '../../../../lib/types/types';
import Grid2 from '@mui/material/Grid2';
import { TasksPagination } from './tasksPagination/TasksPagination';
import { Box, Button } from '@mui/material';

type PropsType = {
  filter: FilterValues;
};

export const Tasks: FC<PropsType> = memo(({ filter }) => {
  const id = useContext(TodolistContext);
  const [page, setPage] = useState(START_PAGE);
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } });
  const [deleteTask] = useDeleteTaskMutation();
  const tasks = data?.items;

  const totalCount = data?.totalCount;

  const count = totalCount ? Math.ceil(totalCount / PAGE_SIZE) : 1;
  const isShowPagination = totalCount && totalCount > PAGE_SIZE;

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
  const deleteTaskHandler = useCallback(() => {
    if (totalCount) {
      if (totalCount % PAGE_SIZE === START_PAGE) {
        setPage(START_PAGE);
      }
    }
  }, [totalCount]);
  const tasksForTodoListMapped = tasksForTodoList.map(t => (
    <Task onClickBasket={deleteTaskHandler} task={t} key={t.id} />
  ));
  const deleteTasksHandler = () => {
    const results = data?.items.map(tsk => deleteTask({ todoListId: id, id: tsk.id }));
    if (results) {
      Promise.all(results).then(() => {
        setPage(1);
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <TasksSkeleton />
      ) : tasksForTodoList.length > 0 ? (
        <>
          <List>{tasksForTodoListMapped}</List>

          <Box sx={{ textAlign: 'right' }}>
            <Button title={'delete all tasks'} variant={'contained'} onClick={deleteTasksHandler}>
              delete all tasks
            </Button>
          </Box>
        </>
      ) : (
        <EmptyTasks>Задачи отсутствуют</EmptyTasks>
      )}{' '}
      {!!isShowPagination && (
        <Grid2 display={'flex'} justifyContent={'center'} sx={{ marginBottom: 2, marginTop: 2 }}>
          <TasksPagination
            page={page}
            size={'small'}
            color={'primary'}
            variant={'text'}
            siblingCount={1}
            shape="rounded"
            count={count}
            onChangePage={setPage}
          />
        </Grid2>
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
