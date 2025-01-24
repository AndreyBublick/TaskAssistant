import {ChangeEvent, useContext} from 'react';
import {useAppDispatch} from "./Hooks";
import {TodolistContext} from "../contexts/TodolistContext";
import {
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeTaskAC
} from "../../features/todolists/model/task-reducer/task-reducer";
import {StatusTask} from "../../features/todolists/model/api/todolists-api";


export const useTask = (id:string) => {

    const dispatch = useAppDispatch();
    const idTodoList = useContext(TodolistContext);/////////////////////

    const removeTask = () => {
        dispatch(removeTaskAC({idTodoList, id}));
    };
    const changeTaskDone = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTaskAC({idTodoList, id, status:e.currentTarget.checked ? StatusTask.Completed : StatusTask.New}));
    };
    const changeTaskTitle = (title: string) => {
        dispatch(changeTitleTaskAC({idTodoList, id, title}));
    };

    return {removeTask,changeTaskDone,changeTaskTitle};
};

