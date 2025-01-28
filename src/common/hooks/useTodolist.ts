import {useAppDispatch} from "./Hooks";
import {useCallback} from "react";
import {
    changeTodolistTitleTC,
    removeTodolistTC
} from "../../features/todolists/model/todolist-reducer/todolists-reducer";
import {createTaskTC, removeAllTasksAC} from "../../features/todolists/model/tasks-reducer/tasks-reducer";

export const useTodolist = (id:string) => {

    const dispatch = useAppDispatch();


    const deleteTodoList = useCallback(() => dispatch(removeTodolistTC(id)),[dispatch,id]);

    const changeTitleTodoList = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC({id, title}));
    },[dispatch,id]);

    const addNewTask = useCallback((title: string) => {

        dispatch(createTaskTC({todoListId:id, title}));
    }, [dispatch,id]);

    const removeAllTasks = useCallback (() => {
        dispatch(removeAllTasksAC({todoListId:id}));
    },[dispatch,id]);





    return {deleteTodoList,changeTitleTodoList,addNewTask,removeAllTasks}
};

