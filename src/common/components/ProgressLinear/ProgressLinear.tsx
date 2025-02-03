import React, { memo } from "react";
import { LinearProgress } from "@mui/material";
import styled from "styled-components";
import { useAppSelector } from "common/hooks/Hooks";
import { getAppStatus } from "../../../app/app-reducer";
import { AppStatus } from "common/enums/enums";

export const ProgressLinear = memo(() => {
  const status = useAppSelector(getAppStatus);

  return <ProgressWrapper>{status === AppStatus.loading && <LinearProgress />}</ProgressWrapper>;
});

const ProgressWrapper = styled.div`
  height: 4px;
`;
