import React, {ChangeEvent, FC, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';


import styled from "styled-components";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableString} from "./components/editableString/EditableString";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type PropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,


    removeTask: (taskId: string, idTodoLists: string) => void,
    changeFilter: (value: FilterValuesType, idTodoLists: string) => void,
    addNewTask: (title: string, idTodoLists: string) => void,
    deleteTodoList: (idTodoList: string) => void,
    changeTaskDone: (id: string, isDone: boolean, idTodoLists: string) => void,
    removeAllTasks: (idTodoLists: string) => void,
    changeTitleTodoList: (idTodoList: string, newTodoTitle: string) => void,
    changeTaskTitle: (idTodoList: string, idTask: string, newTaskTitle: string) => void,

}


export const Todolist: FC<PropsType> = ({
                                            title,
                                            filter,
                                            changeTaskDone,
                                            tasks,
                                            removeTask,
                                            changeFilter,
                                            removeAllTasks,
                                            addNewTask,
                                            deleteTodoList,
                                            id,
                                            changeTitleTodoList,
                                            changeTaskTitle,

                                        }) => {

    const removeTasks = () => {
        removeAllTasks(id);
    };



    const addNewTaskInThisTODO = useCallback((inputValue: string) => {
        addNewTask(inputValue, id);

    }, [addNewTask, id]);

    const changeTitleInThisTODO = useCallback((inputValue: string) => {
        changeTitleTodoList(id, inputValue);

    }, [changeTitleTodoList, id]);


    return <TodolistStyled>
        <FlexWrapper>
            <TodoTitle>

                <EditableString autoFocus isDisabledOnBlur={false} changeString={changeTitleInThisTODO} title={title}/>
            </TodoTitle>

            <IconButton aria-label="delete" size="large" onClick={() => deleteTodoList(id)}>
                <Delete fontSize="inherit"/>
            </IconButton>


        </FlexWrapper>
            <AddItemForm callBack={addNewTaskInThisTODO}/>

        {tasks.length > 0 ? <List>
            {
                tasks.map(t => {
                        const onClickRemoveTaskHandler = () => {
                            removeTask(t.id, id);
                        };
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskDone(t.id, e.currentTarget.checked, id);
                        };
                        const changeTaskTitleHandler = (inputValue: string) => {

                            changeTaskTitle(id, t.id, inputValue);


                        };

                        return <li key={t.id} style={{opacity: `${t.isDone ? 0.5 : 1}`}}>

                            <EditableString onChange={onChangeHandler} changeString={changeTaskTitleHandler}
                                            isDone={t.isDone} title={t.title} />
                            <IconButton aria-label="delete" size="small" onClick={onClickRemoveTaskHandler}>
                                <Delete fontSize="inherit"/>
                            </IconButton>
                        </li>

                    }
                )
            }
        </List> : <h2>Задачи отсутсвуют</h2>}
        <Button title={'delete all'} variant={'contained'} onClick={removeTasks}>delete all</Button>

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
}


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
const List = styled.ul`
    /*padding: 0;*/

    & > li {
        display: flex;
        align-items: center;
        
    }

`;
const TodolistStyled = styled.div`
padding: 15px;
`;

