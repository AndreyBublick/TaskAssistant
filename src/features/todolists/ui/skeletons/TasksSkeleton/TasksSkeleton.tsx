import React from 'react';
import { dublicatesComponents } from 'common/utils';
import { Box, Grid2 } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const TasksSkeleton = () => {
  return (
    <Box sx={{ margin: '12px 0' }}>
      {dublicatesComponents({
        quantity: 3,
        item: (
          <Grid2 justifyContent={'space-between'} display="flex" alignItems="center">
            <Grid2 display="flex" alignItems={'center'}>
              <Skeleton width={20} height={35} sx={{ marginRight: 0.8 }} />
              <Skeleton width={180} height={28} />
            </Grid2>
            <Skeleton width={25} height={40} />
          </Grid2>
        ),
      })}
    </Box>
  );
};
