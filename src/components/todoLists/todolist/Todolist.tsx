import React, {FC, memo, useCallback} from 'react';
import {TodoListType} from '../../../app/App';


import styled from "styled-components";
import {AddItemForm} from "../../addItemForm/AddItemForm";
import {EditableString} from "../../editableString/EditableString";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, removeAllTasksAC,} from "../../../store/task-reducer/task-reducer";
import {useAppDispatch} from "../../../hooks/Hooks";
import {Tasks} from "../../tasks/Tasks";
import {changeTodolistTitleAC, removeTodoListAC} from "../../../store/todolist-reducer/todolists-reducer";
import {TodolistContext} from "../../../contexts/TodolistContext";
import {FilterButtons} from "../../filterButtons/FilterButtons";


type PropsType = {

    todoList:TodoListType

}


export const Todolist: FC<PropsType> = memo(({
                                                 todoList
                                        }) => {

    const {id,title,filter} = todoList;

    const dispatch = useAppDispatch();


    const deleteTodoList = useCallback(() => dispatch(removeTodoListAC(id)),[dispatch,id]);

    const changeTitleTodoList = useCallback( ( title: string) => {
        dispatch(changeTodolistTitleAC({id, title}));
    },[dispatch,id]);

    const addNewTask = useCallback((title: string) => {

        dispatch(addTaskAC({idTodoList:id, title}));
    }, [dispatch,id]);

    const removeAllTasks = useCallback (() => {
        dispatch(removeAllTasksAC({idTodoList:id}));
    },[dispatch,id]);



    return <TodolistContext.Provider value={id}>
            <TodolistStyled>
            <FlexWrapper>
            <TodoTitle>

                <EditableString  changeString={changeTitleTodoList} title={title}/>
            </TodoTitle>

            <IconButton aria-label="delete" size="large" onClick={deleteTodoList}>
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
    font-size: 22px;
    font-weight: 700;
    input{
        font-size: 22px;
        
    }
`;


const TodolistStyled = styled.div`
padding: 15px;
`;

