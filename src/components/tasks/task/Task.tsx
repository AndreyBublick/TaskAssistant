import React, {ChangeEvent, FC, memo, useContext} from 'react';
import {EditableString} from "../../editableString/EditableString";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../../store/task-reducer/task-reducer";
import {TodolistContext} from "../../../contexts/TodolistContext";
import {useAppDispatch} from "../../../hooks/Hooks";
import {TaskType} from "../../../app/App";

type Props = {
  task:TaskType

};

export const Task: FC<Props> = memo(({task}) => {
const {isDone,title,id} = task;
    const dispatch = useAppDispatch();
    const idTodoList = useContext(TodolistContext);/////////////////////

    const removeTask = () => {
        dispatch(removeTaskAC({idTodoList, id}));
    };
    const changeTaskDone = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTaskAC({idTodoList, id, isDone:e.currentTarget.checked}));
    };
    const changeTaskTitle = (title: string) => {
        dispatch(changeTitleTaskAC({idTodoList, id, title}));
    };


    return <li style={{opacity: `${isDone ? 0.5 : 1}`}}>
        <Checkbox
            checked={isDone}
            onChange={changeTaskDone}
            inputProps={{'aria-label': 'controlled'}}
        />
        <EditableString  changeString={changeTaskTitle}
                        title={title}/>
        <IconButton aria-label="delete" size="medium" onClick={removeTask}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </li>
});

