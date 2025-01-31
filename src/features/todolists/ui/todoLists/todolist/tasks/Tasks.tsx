import React, { FC, memo, useContext, useEffect, useMemo } from "react";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { selectorGetTaskById } from "../../../../model/selectors/tasks-selectors";
import { Task } from "./task/Task";
import { TodolistContext } from "common/contexts/TodolistContext";
import { FilterValuesType } from "../../../../model/todolist-reducer/todolists-reducer";
import { getTasksTC, TaskDomainType } from "../../../../model/tasks-reducer/tasks-reducer";
import { StatusTask } from "common/enums/enums";

type PropsType = {
  filter: FilterValuesType;
};

export const Tasks: FC<PropsType> = memo(({ filter }) => {
  const id = useContext(TodolistContext);
  const tasks = useAppSelector((state) => selectorGetTaskById(state, id));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(id));
  }, [dispatch, id]);

  const tasksForTodoList: TaskDomainType[] = useMemo(() => {
    switch (filter) {
      case "active": {
        return tasks.filter((t) => t.status === StatusTask.New);
      }
      case "completed": {
        return tasks.filter((t) => t.status === StatusTask.Completed);
      }
      case "three": {
        return tasks.filter((_, index) => index < 3);
      }
      default: {
        return tasks;
      }
    }
  }, [filter, tasks]);

  const tasksForTodoListMapped = tasksForTodoList.map((t) => {
    return <Task task={t} key={t.id} />;
  });

  return <>{tasksForTodoList.length > 0 ? <List>{tasksForTodoListMapped}</List> : <h2>Задачи отсутствуют</h2>}</>;
});

const List = styled.ul`
  & > li {
    display: flex;
    align-items: center;
  }
`;
