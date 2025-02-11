import React, { memo, useCallback } from "react";

import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { getAppError, setAppError } from "app/app-reducer";

export const AlertStatus = memo(() => {
  const error = useAppSelector(getAppError);
  const dispatch = useAppDispatch();
  const onCloseHandler = useCallback(() => {
    dispatch(setAppError({ error: null }));
  }, [dispatch]);
  return (
    <AlertStyled severity="error" color="error" onClose={onCloseHandler}>
      {error}
    </AlertStyled>
  );
});

const AlertStyled = styled(Alert)`
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -0%);
`;
