import { FC } from "react";
import styled from "styled-components";

type PropsType = {
  title: string;
  callBack: () => void;
};

export const TasksButton: FC<PropsType> = ({ title, callBack }) => {
  return (
    <ButtonStyled
      onClick={() => {
        callBack();
      }}
    >
      {title}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  width: 100px;
  height: 100px;
`;
