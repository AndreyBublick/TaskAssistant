import { ChangeEvent, useCallback, useContext } from 'react';
import { useAppDispatch } from './Hooks';
import { TodolistContext } from 'common/contexts';
import { removeTaskTC, updateTaskTC } from '../../features/todolists/model/tasksSlice/tasksSlice';
import { StatusTask } from 'common/enums';

export const useTask = (id: string) => {
  const dispatch = useAppDispatch();

  const todoListId = useContext(TodolistContext); /////////////////////

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC({ todoListId, id }));
  }, [dispatch, todoListId, id]);

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskTC({
          todoListId,
          taskId: id,
          domainModel: { status: e.currentTarget.checked ? StatusTask.Completed : StatusTask.New },
        }),
      );
    },
    [dispatch, todoListId, id],
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      dispatch(updateTaskTC({ todoListId, taskId: id, domainModel: { title } }));
    },
    [dispatch, todoListId, id],
  );

  return { removeTask, changeTaskStatus, changeTaskTitle };
};
