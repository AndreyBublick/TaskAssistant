import styled from "styled-components";

import React, { FC } from "react";
import { EditableString } from "../../../../../../common/components/editableString/EditableString";

type Props = {
  onChange: (newTitle: string) => void;
  title: string;
};

export const TodolistTitle: FC<Props> = ({ onChange, title }) => {
  return (
    <TodoTitle>
      <EditableString changeString={onChange} title={title} />
    </TodoTitle>
  );
};

export const TodoTitle = styled.div`
  margin: 10px 0;
  font-size: 22px;
  font-weight: 700;
  input {
    font-size: 22px;
  }
`;
