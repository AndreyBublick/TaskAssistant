import React, {ChangeEvent, FC, memo, useMemo} from "react";
import {EditableString} from "../editableString/EditableString";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import styled from "styled-components";
import {FilterValuesType, TaskType} from "../../App";
import {useAppDispatch, useAppSelector} from "../../hooks/Hooks";
import {selectorGetTaskById} from "../../store/selectors/tasks-selectors";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../store/task-reducer/task-reducer";




type PropsType = {

    id: string,
    filter:FilterValuesType,

};



export const Tasks: FC<PropsType> = memo(({id,filter}) => {
    const tasksById = useAppSelector((state)=>selectorGetTaskById(state,id));
    const dispatch = useAppDispatch();

    const tasksForTodoList: TaskType[] = useMemo(()=>{

        switch (filter) {
            case "active": {
                return   tasksById.filter(t => !t.isDone);
            }
            case "completed": {
                return  tasksById.filter(t => t.isDone);
            }
            case "three": {
                return  tasksById.filter((t, index) => index < 3);
            }
            default: {

                return tasksById;

            }
        }

    },[filter,tasksById]);

    const removeTask = (id: string, idTodoLists: string) => {
        dispatch(removeTaskAC(idTodoLists, id));
    };
    const changeTaskDone = (id: string, isDone: boolean, idTodoLists: string) => {
        dispatch(changeStatusTaskAC(idTodoLists, id, isDone));
    };
    const changeTaskTitle = (idTodoList: string, idTask: string, newTaskTitle: string) => {
        dispatch(changeTitleTaskAC(idTodoList, idTask, newTaskTitle));
    };
    console.log('tasks')
    return <>
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
    </>

});


const List = styled.ul`
    /*padding: 0;*/

    & > li {
        display: flex;
        align-items: center;
        
    }

`;

