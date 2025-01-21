import React, {FC, memo} from 'react';
import {TodoListType} from '../../../../../app/App';


import styled from "styled-components";
import {AddItemForm} from "../../../../../common/components/addItemForm/AddItemForm";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Tasks} from "./tasks/Tasks";
import {TodolistContext} from "../../../../../common/contexts/TodolistContext";
import {FilterButtons} from "./filterButtons/FilterButtons";
import {TodolistTitle} from "./todolistTitle/TodolistTitle";
import {useTodolist} from "../../../../../common/hooks/useTodolist";


type PropsType = {

    todoList:TodoListType

}


export const Todolist: FC<PropsType> = memo(({
                                                 todoList
                                        }) => {

    const {id,title,filter} = todoList;

   const {deleteTodoList,changeTitleTodoList,addNewTask,removeAllTasks} =  useTodolist(id);


    return <TodolistContext.Provider value={id}>
            <TodolistStyled>
            <FlexWrapper>
            <TodolistTitle onChange={changeTitleTodoList} title={title}/>



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


const TodolistStyled = styled.div`
padding: 15px;
`;

