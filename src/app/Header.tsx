import React, {memo, useCallback, useMemo, useState} from 'react';
import {AppBar, Box, Button, IconButton, Switch, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../hooks/Hooks";
import {getModeTheme} from "./app-selectors";
import {changeThemeModeAC} from "./app-reducer";
import {getTheme} from "./theme/Theme";

export const Header = memo(() => {

    const [value,setValue] = useState("1");
    const themeMode = useAppSelector(getModeTheme);
    const dispatch = useDispatch();

    const changeThemeMode = useCallback(()=>{
        dispatch(changeThemeModeAC({themeMode: themeMode==='light'?'dark':'light'}));
    },[dispatch,themeMode]);

    const theme = useMemo(()=>{
       return  getTheme(themeMode);
    },[themeMode]) ;

    return <AppBarStyled position="static" color="secondary">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
            >
                <Menu/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                News
            </Typography>

            <Box sx={{display:'flex',gap:'15px'}}>
                <Button sx={{boxShadow: `4px 4px 2px 0px ${theme.palette.primary.dark}`}} onClick={()=>setValue('1')} variant={'contained'} >Login</Button>
                <Button sx={{boxShadow: `4px 4px 2px 0px ${theme.palette.primary.dark}`}}  onClick={()=>setValue('2')} variant={'contained'}>Two</Button>
                <Button sx={{boxShadow: `4px 4px 2px 0px ${theme.palette.primary.dark}`}}  onClick={()=>setValue('3')} variant={'contained'}>Three</Button>
                <Switch onChange={changeThemeMode} />
            </Box>


        </Toolbar>
    </AppBarStyled>
});

const AppBarStyled = styled(AppBar)`
    margin-bottom: 30px;
`;