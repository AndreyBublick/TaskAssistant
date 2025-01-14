import React, {FC, memo, useContext, useMemo} from "react";

import styled from "styled-components";
import {FilterValuesType, TaskType} from "../../App";
import {useAppSelector} from "../../hooks/Hooks";
import {selectorGetTaskById} from "../../store/selectors/tasks-selectors";
import {Task} from "./task/Task";
import {TodolistContext} from "../../contexts/TodolistContext";




type PropsType = {


    filter:FilterValuesType,

};



export const Tasks: FC<PropsType> = memo(({filter}) => {
    const id = useContext(TodolistContext);
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
                       /* const onClickRemoveTaskHandler = () => {
                            removeTask(t.id, id);
                        };
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskDone(t.id, e.currentTarget.checked, id);
                        };
                        const changeTaskTitleHandler = (inputValue: string) => {

                            changeTaskTitle(id, t.id, inputValue);


                        };*/

                        return <Task title={t.title} isDone={t.isDone} key={t.id} id={t.id} />

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

