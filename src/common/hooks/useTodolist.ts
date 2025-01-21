import {useAppDispatch} from "./Hooks";
import {useCallback} from "react";
import {
    changeTodolistTitleAC,
    removeTodoListAC
} from "../../features/todolists/model/todolist-reducer/todolists-reducer";
import {addTaskAC, removeAllTasksAC} from "../../features/todolists/model/task-reducer/task-reducer";

export const useTodolist = (id:string) => {

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





    return {deleteTodoList,changeTitleTodoList,addNewTask,removeAllTasks}
};

