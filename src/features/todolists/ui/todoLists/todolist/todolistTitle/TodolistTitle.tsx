import styled from "styled-components";

import React, { FC, memo } from "react";
import { EditableString } from "common/components/editableString/EditableString";
import { AppStatus } from "common/enums/enums";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTodolist } from "common/hooks/useTodolist";
import { TodoListDomainType } from "../../../../model/todolist-reducer/todolists-reducer";

type Props = {
  /*  onChange: (newTitle: string) => void;
  title: string;
  disabled?: boolean;*/
  todoList: TodoListDomainType;
};

export const TodolistTitle: FC<Props> = memo(({ /*title, disabled,*/ todoList }) => {
  const { deleteTodoList, changeTitleTodoList } = useTodolist(todoList.id);

  const isDisabled = todoList.status === AppStatus.loading;

  return (
    <FlexWrapper>
      <TodoTitle>
        <EditableString changeString={changeTitleTodoList} title={todoList.title} disabled={isDisabled} />
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
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
