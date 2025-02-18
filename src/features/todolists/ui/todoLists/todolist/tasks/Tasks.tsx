import React, { FC, memo, useContext, useMemo } from "react";

import styled from "styled-components";

import { Task } from "./task/Task";
import { FilterValuesType } from "../../../../model/todolist-reducer/todolists-reducer";
import { getTasks } from "../../../../model/tasks-reducer/tasks-reducer";
import type { TaskType } from "../../../../api/tasksApi.types";
import { TodolistContext } from "common/contexts";
import { useAppSelector } from "common/hooks";
import { StatusTask } from "common/enums";

type PropsType = {
  filter: FilterValuesType;
};

export const Tasks: FC<PropsType> = memo(({ filter }) => {
  const id = useContext(TodolistContext);
  /*const tasks = useAppSelector((state) => getTasks({ tasks: state.tasks }, id)) || [];*/ /*important*/
  const tasks = useAppSelector((state) => getTasks(state, id));
  const tasksForTodoList: TaskType[] = useMemo(() => {
    if (!tasks) return [];
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

  const tasksForTodoListMapped = tasksForTodoList.map((t) => <Task task={t} key={t.id} />);

  return <>{tasksForTodoList.length > 0 ? <List>{tasksForTodoListMapped}</List> : <h2>Задачи отсутствуют</h2>}</>;
});

const List = styled.ul`
  & > li {
    display: flex;
    align-items: center;
  }
`;
