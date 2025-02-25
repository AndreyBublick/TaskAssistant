import React, { memo } from 'react';
import { LinearProgress } from '@mui/material';
import styled from 'styled-components';
import { useAppSelector } from 'common/hooks/Hooks';
import { AppStatus } from 'common/enums/enums';
import { getAppStatus } from 'app/appSlice';

export const ProgressLinear = memo(() => {
  const status = useAppSelector(getAppStatus);

  return <ProgressWrapper>{status === AppStatus.loading && <LinearProgress />}</ProgressWrapper>;
});

const ProgressWrapper = styled.div`
  height: 4px;
`;
