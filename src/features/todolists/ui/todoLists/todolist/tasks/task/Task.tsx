import React, { FC, memo, useCallback, useContext } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { TaskType } from "../../../../../api/tasksApi.types";
import { getTodoListStatus } from "../../../../../model/todolist-reducer/todolists-reducer";
import { TodolistContext } from "common/contexts";
import { useAppSelector, useTask } from "common/hooks";
import { AppStatus, StatusTask } from "common/enums";
import { EditableSpan } from "common/components";

type Props = {
  task: TaskType;
};

export const Task: FC<Props> = memo(({ task }) => {
  const { status, title, id } = task;

  const { removeTask, changeTaskStatus, changeTaskTitle } = useTask(id);

  const idTodo = useContext(TodolistContext);

  const todoStatus = useAppSelector((state) => getTodoListStatus(state, idTodo));

  const changeString = useCallback(
    (title: string) => {
      changeTaskTitle(title);
    },
    [changeTaskTitle],
  );

  return (
    <li style={{ opacity: `${status === StatusTask.Completed ? 0.5 : 1}` }}>
      <Checkbox
        checked={status === StatusTask.Completed}
        onChange={changeTaskStatus}
        inputProps={{ "aria-label": "controlled" }}
        disabled={todoStatus === AppStatus.loading}
      />
      <EditableSpan disabled={todoStatus === AppStatus.loading} changeString={changeString} title={title} />
      <IconButton disabled={todoStatus === AppStatus.loading} aria-label="delete" size="medium" onClick={removeTask}>
        <Delete fontSize="inherit" />
      </IconButton>
    </li>
  );
});
