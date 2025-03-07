import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import { Grid2 } from '@mui/material';
import React from 'react';
import { dublicatesComponents } from 'common/utils';
import { TasksSkeleton } from '../TasksSkeleton/TasksSkeleton';

export const TodolistSkeleton = () => {
  return (
    <>
      <TodolistSkeletonStyled>
        <Skeleton width={200} height={40} />

        <Grid2 display="flex">
          <Skeleton width={210} sx={{ marginRight: 2 }} height={50} />
          <Skeleton width={50} height={50} />
        </Grid2>

        <TasksSkeleton />
        <Grid2 display="flex" justifyContent={'space-between'}>
          {dublicatesComponents({ quantity: 3, item: <Skeleton width={80} height={50} /> })}
        </Grid2>
      </TodolistSkeletonStyled>
    </>
  );
};

const TodolistSkeletonStyled = styled.div`
  padding: 15px;
  width: 300px;
  min-height: 200px;
`;
