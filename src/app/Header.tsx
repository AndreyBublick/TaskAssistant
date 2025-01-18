import React, {memo, useCallback, useState} from 'react';
import {AppBar, Box, Button, IconButton, Switch, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks/Hooks";
import {getModeTheme} from "./app-selectors";
import {changeThemeModeAC} from "./app-reducer";
import {styled} from '@mui/material/styles';

export const Header = memo(() => {

    const [value, setValue] = useState("1");
    const themeMode = useAppSelector(getModeTheme);
    const dispatch = useDispatch();

    const changeThemeMode = useCallback(() => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    }, [dispatch, themeMode]);


    return <AppBarStyled   position="static">
        <ToolbarStyled>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
            >
                <Menu/>
            </IconButton>


            <Box sx={{display: 'flex', gap: '15px'}}>

                 <ButtonStyled defaultValue={value} onClick={() => setValue('1')} variant={'contained'}>Login</ButtonStyled>
                <ButtonStyled defaultValue={value} onClick={() => setValue('2')} variant={'contained'}>Two</ButtonStyled>
                <ButtonStyled defaultValue={value} onClick={() => setValue('3')} variant={'contained'}>Three</ButtonStyled>
                <Switch onChange={changeThemeMode}/>
            </Box>


        </ToolbarStyled>
    </AppBarStyled>
});


const AppBarStyled = styled(AppBar)(({theme}) => ({
    marginBottom:'30px',
    backgroundColor: theme.palette.primary.light,
    ...(theme.palette.mode === 'dark' && {
        backgroundColor: '#333',
    }),

}));

const ToolbarStyled = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',

})


/*const ButtonStyled = styled(Button)({
    boxShadow: `4px 4px 2px 0px ${theme.palette.primary.dark}`,
    '&:hover': {backgroundColor: 'white'},
});*/
/*const ButtonStyled = styled(Button)(({ theme }) => ({
    boxShadow: `4px 4px 2px 0px ${theme.palette.primary.dark}`,
    '&:hover': {backgroundColor: 'white'},
}));*/
/*
const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    boxShadow: `4px 4px 2px 0px ${theme.palette.primary.dark}`,
    '&:hover': {backgroundColor: 'white'},
}));
*/


 const ButtonStyled = styled(Button)(({theme}) => ({

    boxShadow: `4px 4px 0px -0px ${theme.palette.primary.dark}`,
    '&:hover': {
       /* backgroundColor: 'white',*/
        boxShadow: `4px 4px 2px 0px ${theme.palette.primary.light}`,
    },
    minWidth:100,
     fontWeight:600,
     border: `2px solid ${theme.palette.primary.dark}`,

}));

