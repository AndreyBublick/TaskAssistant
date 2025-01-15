import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import styled from "styled-components";

export const Header = () => {
    return    <AppBarStyled position="static">
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
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBarStyled>
};

const AppBarStyled = styled(AppBar)`
    margin-bottom: 30px;
`;