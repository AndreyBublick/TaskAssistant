import React, { FC, memo } from 'react';
import { LinearProgress } from '@mui/material';
import styled from 'styled-components';
import { useAppSelector } from 'common/hooks';
import { selectAppStatus } from 'app/appSlice';
import { AppStatus } from 'common/enums';

type Props = {};
export const ProgressLinear: FC<Props> = memo(() => {
  const status = useAppSelector(selectAppStatus);
  const isLoading = status === AppStatus.loading;
  console.log(status);
  return <ProgressWrapper>{isLoading && <LinearProgress />}</ProgressWrapper>;
});

const ProgressWrapper = styled.div`
  height: 4px;
`;
