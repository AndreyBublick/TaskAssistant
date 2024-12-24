import React, {ChangeEvent, FC, useCallback, useMemo} from 'react';
import {FilterValuesType, TaskType} from './App';


import styled from "styled-components";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableString} from "./components/editableString/EditableString";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeAllTasksAC,
    removeTaskAC, TaskItemType,
} from "./store/task-reduce/task-reduce";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";


type PropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,

    changeFilter: (value: FilterValuesType, idTodoLists: string) => void,
    deleteTodoList: (idTodoList: string) => void,
    changeTitleTodoList: (idTodoList: string, newTodoTitle: string) => void,

}


export const Todolist: FC<PropsType> = ({
                                            id,
                                            title,
                                            filter,

                                            changeFilter,
                                            deleteTodoList,
                                            changeTitleTodoList,
                                        }) => {


    const tasks = useSelector<StateType, TaskItemType>(state => state.tasks);
    const dispatch = useDispatch();
    let tasksForTodoList: TaskType[] = useMemo(()=>{

        switch (filter) {
            case "active": {
              return   tasks[id].filter(t => !t.isDone);
            }
            case "completed": {
                return  tasks[id].filter(t => t.isDone);
            }
            case "three": {
                return  tasks[id].filter((t, index) => index < 3);
            }
            default: {

                return  tasks[id];

            }
        }

    },[filter,tasks]);



    const removeTasks = useCallback(() => {
        removeAllTasks(id);
    },[]);


    const addNewTaskInThisTODO = useCallback((inputValue: string) => {
        addNewTask(inputValue, id);

    }, [id]);
    const changeTitleInThisTODO = useCallback((inputValue: string) => {
        changeTitleTodoList(id, inputValue);

    }, [changeTitleTodoList, id]);



    const removeTask = (id: string, idTodoLists: string) => {
        dispatch(removeTaskAC(idTodoLists, id));
    }
    const addNewTask = (title: string, idTodoLists: string) => {
        dispatch(addTaskAC(idTodoLists, title));
    };
    const changeTaskDone = (id: string, isDone: boolean, idTodoLists: string) => {
        dispatch(changeStatusTaskAC(idTodoLists, id, isDone));
    };
    const removeAllTasks = (idTodoLists: string) => {
        dispatch(removeAllTasksAC(idTodoLists));
    };
    const changeTaskTitle = (idTodoList: string, idTask: string, newTaskTitle: string) => {
        dispatch(changeTitleTaskAC(idTodoList, idTask, newTaskTitle));
    };




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

        {tasksForTodoList.length > 0 ? <List>
            {
                tasksForTodoList.map(t => {
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
        </List> : <h2>Задачи отсутствуют</h2>}
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

