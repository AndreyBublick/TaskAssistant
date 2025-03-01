import React, { FC, memo, useCallback, useState } from 'react';
import { AppBar, Box, Button, IconButton, Switch, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { styled } from '@mui/material/styles';
import { changeIsAuth, changeThemeMode, getIsAuth, getModeTheme, setAppError } from 'app/appSlice';
/*import { logout } from '../../../features/login/model/authSlice/authSlice';*/
import { MenuButton, ProgressLinear } from 'common/components';
import { useLogoutMutation } from '../../../features/login/api/authApi';
import { ResultCodeStatus } from 'common/enums';

type Props = {
  isLoading: boolean;
};
export const Header: FC<Props> = memo(({ isLoading }) => {
  const [value, setValue] = useState('1');
  const themeMode = useAppSelector(getModeTheme);
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const onChangeHandler = useCallback(() => {
    dispatch(changeThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }));
  }, [dispatch, themeMode]);

  const onClickHandler = async () => {
    const response = await logout();
    const data = response.data;
    if (data?.resultCode === ResultCodeStatus.success) {
      localStorage.removeItem('sn-token');
      dispatch(changeIsAuth({ isAuth: false }));
    } else {
      const error = data?.messages[0];
      error && dispatch(setAppError({ error }));
    }
  };

  return (
    <AppBarStyled position="static">
      <ToolbarStyled>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>

        <Box sx={{ display: 'flex', gap: '15px' }}>
          <MenuButton defaultValue={value} onClick={() => setValue('1')} variant={'contained'}>
            one
          </MenuButton>
          <MenuButton defaultValue={value} onClick={() => setValue('2')} variant={'contained'}>
            Two
          </MenuButton>
          <MenuButton defaultValue={value} onClick={() => setValue('3')} variant={'contained'}>
            Three
          </MenuButton>

          <Switch onChange={onChangeHandler} />
          {isAuth && (
            <Button color={'secondary'} onClick={onClickHandler} variant="outlined">
              Log Out
            </Button>
          )}
        </Box>
      </ToolbarStyled>
      <ProgressLinear isLoading={isLoading} />
    </AppBarStyled>
  );
});

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  marginBottom: '30px',
  backgroundColor: theme.palette.primary.light,
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: '#333',
  }),
}));

const ToolbarStyled = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});
