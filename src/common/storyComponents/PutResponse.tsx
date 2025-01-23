import React, {useEffect, useState} from "react";
import {Model, TaskType, todolistsApi, TodolistType} from "../../features/todolists/model/api/todolists-api";
import {Wrapper} from "./Wrapper/Wrapper";
import {EditableLi} from "./Wrapper/editableLi/EditableLi";
import styled from "styled-components";

export const PutResponse = () => {


    const [state, setState] = useState<TodolistType[]>([]);
    const [tasks, setTasks] = useState<{ [key: string]: TaskType[] }>({});


    const changeTodoListTitle = (id: string, title: string,) => {

        todolistsApi.putTodolist({
            id,
            title,
        }).then(response => setState(prev => prev ? prev.map(td => td.id === id ? {...td, title} : td) : []));


    };


    const changeTaskTitle = (todolistId: string, title: string, taskId: string) => {

        const task = tasks[todolistId].find(tsk => tsk.id === taskId) as TaskType;



        const model: Model = {
            title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        };


        todolistsApi.changeTaskTitle({
            todolistId,
            taskId,
            model
        }).then(response => setTasks(prev=>({...prev,[todolistId]:prev[todolistId].map(tsk=>tsk.id===taskId ? {...tsk,title:title} : tsk)})));


    };


    /*changeTaskTitle*/
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((response) => {
                setState(response.data);
                return response.data;
            })
            .then(todolists => todolists.forEach(td => todolistsApi.getTasks(td.id)
                .then(response => setTasks(prev => ({...prev, [td.id]: response.data.items})))));
    }, []);

    const mappedTodos = state?.map(td => <li key={td.id}>
            <EditableLi key={td.id} idTodoList={td.id} title={td.title} onBlur={changeTodoListTitle}/>
            {tasks[td.id] ? <ul>
                {tasks[td.id].map(tsk => <EditableLi key={tsk.id} title={tsk.title} idTodoList={td.id} taskId={tsk.id} onBlur={changeTaskTitle as (todolistId: string, title: string, taskId?: string | undefined) => void }/>)}{/*<li key={tsk.id} >{tsk.title}</li>*/}
            </ul> : false}

        </li>
    );

    return <Wrapper>
        {/* {state ? JSON.stringify(state) : 'Waiting...'}*/}

        <List>
            {mappedTodos}
        </List>


    </Wrapper>
};


const List = styled.ul`

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > ul {
        margin: 0;
        padding: 0;
    }

    /* align-items: flex-start !important;
    justify-content: center;*/

`;

