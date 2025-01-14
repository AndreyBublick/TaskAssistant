import React, { FC, memo, useCallback} from 'react';
import {FilterValuesType} from './App';


import styled from "styled-components";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableString} from "./components/editableString/EditableString";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    addTaskAC,

    removeAllTasksAC,

} from "./store/task-reducer/task-reducer";
import {useAppDispatch} from "./hooks/Hooks";
import {Tasks} from "./components/tasks/Tasks";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC
} from "./store/todolist-reducer/todolists-reducer";


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





    const changeFilter = useCallback( (value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, value));
    },[dispatch,id]);

    const deleteTodoList = useCallback(() => {
        dispatch(removeTodoListAC(id));
    },[dispatch,id]);

    const changeTitleTodoList = useCallback( ( title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    },[dispatch,id]);

    const addNewTask = useCallback((title: string) => {

        dispatch(addTaskAC(id, title));
    }, [dispatch,id]);


    const removeAllTasks = useCallback (() => {
        dispatch(removeAllTasksAC(id));
    },[dispatch,id]);



    return <TodolistStyled>
        <FlexWrapper>
            <TodoTitle>

                <EditableString autoFocus isDisabledOnBlur={false} changeString={changeTitleTodoList} title={title} weightText/>
            </TodoTitle>

            <IconButton aria-label="delete" size="large" onClick={deleteTodoList}>
                <Delete fontSize="inherit"/>
            </IconButton>


        </FlexWrapper>
            <AddItemForm callBack={addNewTask}/>

        <Tasks id={id} filter={filter} />
        <Button title={'delete all'} variant={'contained'} onClick={removeAllTasks}>delete all</Button>

        <ButtonsWrapper>
            {/*isActive={filter === 'all'}*/}
            {/*isActive={filter === 'active'}*/}
            {/*isActive={filter === "completed"}*/}
            {/*isActive={filter === 'three'}*/}
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
    </TodolistStyled>
});


const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 10px;

`;
const TodoTitle = styled.div`
    margin: 10px 0;
`;
const ButtonsWrapper = styled.div`
   /* padding: 20px 0;*/
    margin-top: 15px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
`;

const TodolistStyled = styled.div`
padding: 15px;
`;

