import React, {memo, useCallback} from 'react';
import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {Container, Grid2} from "@mui/material";
import {TodoLists} from "../components/todoLists/TodoLists";
import styled from "styled-components";
import {addTodoListAC} from "../store/todolist-reducer/todolists-reducer";
import {useAppDispatch} from "../hooks/Hooks";




export const Main = memo(() => {

    const dispatch = useAppDispatch();

    const addNewTodoList = useCallback((titleTodo: string) => {
        dispatch(addTodoListAC(titleTodo));
    }, [dispatch]);


    return  <Container fixed>
        <AddItemFormWrapper>
            <AddItemForm callBack={addNewTodoList}/>
        </AddItemFormWrapper>
        <Grid2 container={true} spacing={2}>
            <TodoLists />
        </Grid2>
    </Container>
});


const AddItemFormWrapper = styled.div`
    & > div {
        margin-bottom: 30px;
       
    }
`;

const ContainerStyled = styled(Container)`
   /* margin: 0 auto;*/
`;


