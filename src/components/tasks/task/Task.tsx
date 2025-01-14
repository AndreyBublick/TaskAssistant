import React, {ChangeEvent, FC, memo, useContext} from 'react';
import {EditableString} from "../../editableString/EditableString";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../../store/task-reducer/task-reducer";
import {TodolistContext} from "../../../contexts/TodolistContext";
import {useAppDispatch} from "../../../hooks/Hooks";

type Props = {
    id:string,
    isDone: boolean,
    title: string,

};

export const Task: FC<Props> = memo(({isDone,title,id}) => {

    const dispatch = useAppDispatch();
    const idTodoList = useContext(TodolistContext);/////////////////////

    const removeTask = () => {
        dispatch(removeTaskAC(idTodoList, id));
    };
    const changeTaskDone = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTaskAC(idTodoList, id, e.currentTarget.checked));
    };
    const changeTaskTitle = (newTaskTitle: string) => {
        dispatch(changeTitleTaskAC(idTodoList, id, newTaskTitle));
    };


    return <li style={{opacity: `${isDone ? 0.5 : 1}`}}>

        <EditableString onChange={changeTaskDone} changeString={changeTaskTitle}
                        isDone={isDone} title={title}/>
        <IconButton aria-label="delete" size="small" onClick={removeTask}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </li>
});

