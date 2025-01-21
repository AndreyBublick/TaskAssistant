import React, {FC, memo, useContext, useMemo} from "react";

import styled from "styled-components";
import {FilterValuesType, TaskType} from "../../../../../../app/App";
import {useAppSelector} from "../../../../../../common/hooks/Hooks";
import {selectorGetTaskById} from "../../../../model/selectors/tasks-selectors";
import {Task} from "./task/Task";
import {TodolistContext} from "../../../../../../common/contexts/TodolistContext";




type PropsType = {

    filter:FilterValuesType,

};


export const Tasks: FC<PropsType> = memo(({filter}) => {

    const id = useContext(TodolistContext);
    const tasks = useAppSelector((state)=>selectorGetTaskById(state,id));


    const tasksForTodoList: TaskType[] = useMemo(()=>{

        switch (filter) {
            case "active": {
                return   tasks.filter(t => !t.isDone);
            }
            case "completed": {
                return  tasks.filter(t => t.isDone);
            }
            case "three": {
                return  tasks.filter((t, index) => index < 3);
            }
            default: {

                return tasks;

            }
        }

    },[filter,tasks]);

    const tasksForTodoListMapped = tasksForTodoList.map(t => {

            return <Task task={t}  key={t.id} />

        }
    );

    return <>
        {tasksForTodoList.length > 0 ? <List>
            {tasksForTodoListMapped}
        </List> : <h2>Задачи отсутствуют</h2>}
    </>

});


const List = styled.ul`
    
    & > li {
        display: flex;
        align-items: center;
    }

`;

