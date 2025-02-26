import React, { FC, memo } from 'react';
import { LinearProgress } from '@mui/material';
import styled from 'styled-components';

type Props = {
  isLoading: boolean;
};
export const ProgressLinear: FC<Props> = memo(({ isLoading }) => {
  /*const status = useAppSelector(getAppStatus);*/

  return <ProgressWrapper>{/*status === AppStatus.loading*/ isLoading && <LinearProgress />}</ProgressWrapper>;
});

const ProgressWrapper = styled.div`
  height: 4px;
`;
