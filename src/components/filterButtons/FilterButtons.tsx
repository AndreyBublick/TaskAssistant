import React, {FC, memo, useCallback, useContext} from 'react';
import {Button} from "@mui/material";
import styled from "styled-components";
import {FilterValuesType} from "../../app/App";
import {changeTodolistFilterAC} from "../../store/todolist-reducer/todolists-reducer";
import {useAppDispatch} from "../../hooks/Hooks";
import {TodolistContext} from "../../contexts/TodolistContext";

type Props = {
    filter:FilterValuesType;
};

export const FilterButtons:FC<Props> = memo(({filter}) => {

    const dispatch = useAppDispatch();
    const idTodoLists = useContext(TodolistContext);

    const changeFilter = useCallback( (filter: FilterValuesType, ) => {
        dispatch(changeTodolistFilterAC({idTodoLists, filter}));
    },[dispatch,idTodoLists]);

    return  <ButtonsWrapper>

        <Button size={'small'} variant={ filter === 'all' ?'contained':'text'} title={'all'} onClick={() => {
            changeFilter("all");
        }}>all</Button>
        <Button size={'small'} variant={ filter === 'active' ?'contained':'text'} title={'Active'} onClick={() => {
            changeFilter("active");
        }}>Active</Button>
        <Button size={'small'} variant={ filter === 'completed' ?'contained':'text'} title={'Completed'} onClick={() => {
            changeFilter("completed");
        }}>Completed</Button>
        <Button size={'small'} variant={ filter === 'three' ?'contained':'text'} title={'first 3'} onClick={() => {
            changeFilter("three");
        }}>first 3</Button>


    </ButtonsWrapper>
});

const ButtonsWrapper = styled.div`
   /* padding: 20px 0;*/
    margin-top: 15px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
`;

