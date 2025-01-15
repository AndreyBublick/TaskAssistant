import React, { FC, memo, useCallback} from 'react';
import {FilterValuesType} from '../../../app/App';


import styled from "styled-components";
import {AddItemForm} from "../../addItemForm/AddItemForm";
import {EditableString} from "../../editableString/EditableString";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    addTaskAC,

    removeAllTasksAC,

} from "../../../store/task-reducer/task-reducer";
import {useAppDispatch} from "../../../hooks/Hooks";
import {Tasks} from "../../tasks/Tasks";
import {

    changeTodolistTitleAC,
    removeTodoListAC
} from "../../../store/todolist-reducer/todolists-reducer";
import {TodolistContext} from "../../../contexts/TodolistContext";
import {FilterButtons} from "../../filterButtons/FilterButtons";


type PropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,



}


export const Todolist: FC<PropsType> = memo(({
                                            id,
                                            title,
                                            filter,


                                        }) => {

    const dispatch = useAppDispatch();







    const deleteTodoList = useCallback((idTodoLists: string) => {
        dispatch(removeTodoListAC(idTodoLists));
    },[]);

    const changeTitleTodoList = useCallback( ( title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    },[]);

    const addNewTask = useCallback((title: string) => {

        dispatch(addTaskAC(id, title));
    }, []);


    const removeAllTasks = useCallback (() => {
        dispatch(removeAllTasksAC(id));
    },[]);



    return <TodolistContext.Provider value={id}>
        <TodolistStyled>
        <FlexWrapper>
            <TodoTitle>

                <EditableString autoFocus isDisabledOnBlur={false} changeString={changeTitleTodoList} title={title}/>
            </TodoTitle>

            <IconButton aria-label="delete" size="large" onClick={() => deleteTodoList(id)}>
                <Delete fontSize="inherit"/>
            </IconButton>


        </FlexWrapper>
            <AddItemForm callBack={addNewTask}/>

        <Tasks filter={filter} />
        <Button title={'delete all'} variant={'contained'} onClick={removeAllTasks}>delete all</Button>

            <FilterButtons filter={filter} />
    </TodolistStyled>
    </TodolistContext.Provider>
});


const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 10px;

`;
const TodoTitle = styled.div`
    margin: 10px 0;
`;


const TodolistStyled = styled.div`
padding: 15px;
`;

