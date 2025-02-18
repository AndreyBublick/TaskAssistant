import styled from "styled-components";

import React, { FC, memo } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { TodoListDomainType } from "../../../../model/todolist-reducer/todolists-reducer";
import { useTodolist } from "common/hooks";
import { AppStatus } from "common/enums";
import { EditableSpan } from "common/components";

type Props = {
  todoList: TodoListDomainType;
};

export const TodolistTitle: FC<Props> = memo(({ todoList }) => {
  const { deleteTodoList, changeTitleTodoList } = useTodolist(todoList.id);

  const isDisabled = todoList.status === AppStatus.loading;

  return (
    <FlexWrapper>
      <TodoTitle>
        <h3>
          <EditableSpan changeString={changeTitleTodoList} title={todoList.title} disabled={isDisabled} />
        </h3>
      </TodoTitle>
      <IconButton disabled={isDisabled} aria-label="delete" size="large" onClick={deleteTodoList}>
        <Delete fontSize="inherit" />
      </IconButton>
    </FlexWrapper>
  );
});

export const TodoTitle = styled.div`
  margin: 10px 0;
  font-size: 22px;
  font-weight: 700;
  input {
    font-size: 22px;
  }
  h3 {
    margin: 0;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
