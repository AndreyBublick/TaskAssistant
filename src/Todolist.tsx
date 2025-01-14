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
import {TodolistContext} from "./contexts/TodolistContext";


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





    const changeFilter = useCallback( (value: FilterValuesType, idTodoLists: string) => {
        dispatch(changeTodolistFilterAC(idTodoLists, value));
    },[]);

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

        <ButtonsWrapper>
            {/*isActive={filter === 'all'}*/}
            {/*isActive={filter === 'active'}*/}
            {/*isActive={filter === "completed"}*/}
            {/*isActive={filter === 'three'}*/}
            <Button size={'small'} variant={ filter === 'all' ?'contained':'text'} title={'all'} onClick={() => {
                changeFilter("all", id);
            }}>all</Button>
            <Button size={'small'} variant={ filter === 'active' ?'contained':'text'} title={'Active'} onClick={() => {
                changeFilter("active", id);
            }}>Active</Button>
            <Button size={'small'} variant={ filter === 'completed' ?'contained':'text'} title={'Completed'} onClick={() => {
                changeFilter("completed", id);
            }}>Completed</Button>
            <Button size={'small'} variant={ filter === 'three' ?'contained':'text'} title={'first 3'} onClick={() => {
                changeFilter("three", id);
            }}>first 3</Button>


        </ButtonsWrapper>
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

