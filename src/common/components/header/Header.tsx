import React, { FC, memo, useCallback, useState } from 'react';
import { AppBar, Box, Button, IconButton, Switch, Toolbar } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
/* ⭕ => import {Menu} from '@mui/icons-material'*/
/* ⭕ нужно импортировать без {} пример выше, вместо => */
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { styled } from '@mui/material/styles';
import { changeIsAuth, changeThemeMode, selectIsAuth, selectModeTheme, setAppError } from 'app/appSlice';

import { MenuButton, ProgressLinear } from 'common/components';
import { useLogoutMutation } from '../../../features/login/api/authApi';
import { ResultCodeStatus } from 'common/enums';
import { baseApi } from 'app/baseApi';

type Props = {};
export const Header: FC<Props> = memo(() => {
  const [value, setValue] = useState('1');
  const themeMode = useAppSelector(selectModeTheme);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const onChangeHandler = useCallback(() => {
    dispatch(changeThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }));
  }, [dispatch, themeMode]);

  const onClickHandler = async () => {
    try {
      const response = await logout();
      const data = response.data;
      if (data?.resultCode === ResultCodeStatus.success) {
        localStorage.removeItem('sn-token');

        dispatch(changeIsAuth({ isAuth: false }));

        Promise.resolve(null).then(() => {
          dispatch(baseApi.util.invalidateTags(['Tasks', 'Todolists']));
        }); ///// Спросить

        /*dispatch(baseApi.util.resetApiState());*/
      } else {
        const error = data?.messages[0];
        error && dispatch(setAppError({ error }));
      }
    } catch (err) {
      console.log(err);
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
      <ProgressLinear />
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
