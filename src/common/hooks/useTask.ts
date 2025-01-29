import {ChangeEvent, useCallback, useContext} from 'react';
import {useAppDispatch} from "./Hooks";
import {TodolistContext} from "../contexts/TodolistContext";
import {
    removeTaskTC, updateTaskTC
} from "../../features/todolists/model/tasks-reducer/tasks-reducer";
import {StatusTask} from "../enums/enums";


export const useTask = (id:string) => {

    const dispatch = useAppDispatch();

    const todoListId = useContext(TodolistContext);/////////////////////

    const removeTask = useCallback(() =>  {

        dispatch(removeTaskTC({todoListId, id}));

    },[dispatch,todoListId,id]);


    const changeTaskStatus = useCallback((e:ChangeEvent<HTMLInputElement>) => {


        dispatch(updateTaskTC({todoListId, taskId:id, domainModel:{status:e.currentTarget.checked ? StatusTask.Completed : StatusTask.New}}));


        },[dispatch,todoListId,id]);


    const changeTaskTitle = useCallback ((title: string) => {
        dispatch(updateTaskTC({todoListId, taskId:id, domainModel:{title}}));
    },[dispatch,todoListId, id]);

    return {removeTask,changeTaskStatus,changeTaskTitle};
};

