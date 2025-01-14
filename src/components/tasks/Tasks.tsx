import React, {ChangeEvent, FC, memo, useMemo} from "react";
import {EditableString} from "../editableString/EditableString";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import styled from "styled-components";
import {FilterValuesType, TaskType} from "../../App";
import {useAppDispatch, useAppSelector} from "../../hooks/Hooks";
import {selectorGetTaskById} from "../../store/selectors/tasks-selectors";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../store/task-reducer/task-reducer";
import {Task} from "./task/Task";




type PropsType = {

    id: string,
    filter:FilterValuesType,

};



export const Tasks: FC<PropsType> = memo(({id,filter}) => {
    const tasksById = useAppSelector((state)=>selectorGetTaskById(state,id));

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


    return <>
        {tasksForTodoList.length > 0 ? <List>
            {
                tasksForTodoList.map(t => {


                        return <Task key={t.id} id={t.id} isDone={t.isDone} todoId={id} title={t.title} />

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

