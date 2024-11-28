import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

import {Button} from "./components/button/Button";
import styled from "styled-components";
import {AddItemForm} from "./components/addItemForm/AddItemForm";


type PropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,


    removeTask: (taskId: string, idTodoLists: string) => void,
    changeFilter: (value: FilterValuesType, idTodoLists: string) => void,
    addNewTask: (title: string, idTodoLists: string) => void,
    deleteTodoList: (idTodoList: string) => void,
    changeTaskDone: (id: string, isDone: boolean, idTodoLists: string) => void,
    removeAllTasks: (idTodoLists: string) => void,
    changeTitleTodoList: (idTodoList: string, newTodoTitle: string) => void,
    changeTaskTitle:(idTodoList: string,idTask:string, newTaskTitle: string)=>void,

}


export const Todolist: FC<PropsType> = ({
                                            title,
                                            filter,
                                            changeTaskDone,
                                            tasks,
                                            removeTask,
                                            changeFilter,
                                            removeAllTasks,
                                            addNewTask,
                                            deleteTodoList,
                                            id,
                                            changeTitleTodoList,
                                            changeTaskTitle,

                                        }) => {

    const removeTasks = () => {
        removeAllTasks(id);
    };
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);


    const addNewTaskInThisTODO = useCallback((inputValue: string) => {
        addNewTask(inputValue, id);
        setEditMode(false);
    }, [addNewTask, id]);

    const changeTitleInThisTODO = useCallback((inputValue: string) => {
        changeTitleTodoList(id, inputValue);
        setEditMode(false);
    }, [changeTitleTodoList,id]);



    return <div>
        <FlexWrapper>
            <TodoTitle>
                {editMode ? <AddItemForm isDisabledOnBlur={false} autoFocus defaultValue={title} callBack={changeTitleInThisTODO}/> :
                    <h3 onDoubleClick={() => {
                        setEditMode(true)
                    }}>{title}</h3>}
            </TodoTitle>

            <Button title={'X'} onClick={() => deleteTodoList(id)}/>
        </FlexWrapper>

        <AddItemForm callBack={addNewTaskInThisTODO}  />
        {tasks.length > 0 ? <ul>
            {
                tasks.map(t => {
                        const onClickRemoveTaskHandler = () => {
                            removeTask(t.id, id);
                        };
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskDone(t.id, e.currentTarget.checked, id);
                        };
                        const changeTaskTitleHandler = (inputValue: string) => {

                            changeTaskTitle(id,t.id,inputValue);
                            setSelectedTask(null);

                        };

                        return selectedTask === t.id ?
                            <AddItemForm key={t.id} autoFocus isDisabledOnBlur={false} defaultValue={t.title} callBack={changeTaskTitleHandler}/> :
                            <li style={{opacity: `${t.isDone ? 0.5 : 1}`}} key={t.id}>
                                <input onChange={onChangeHandler} type="checkbox"
                                       checked={t.isDone}/>

                                <span onDoubleClick={() => {
                                    setSelectedTask(t.id);
                                }}>{t.title}</span>
                                <button onClick={onClickRemoveTaskHandler}>x</button>
                            </li>

                    }
                )
            }
        </ul> : <h2>Задачи отсутсвуют</h2>}
        <Button title={'delete all'} onClick={removeTasks}/>

        <div>

            <Button isActive={filter === 'all'} title={'all'} onClick={() => {
                changeFilter("all", id);
            }}/>
            <Button isActive={filter === 'active'} title={'Active'} onClick={() => {
                changeFilter("active", id);
            }}/>
            <Button isActive={filter === "completed"} title={'Completed'} onClick={() => {
                changeFilter("completed", id);
            }}/>
            <Button isActive={filter === 'three'} title={'first 3'} onClick={() => {
                changeFilter("three", id);
            }}/>


        </div>
    </div>
}


const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    h3 {
        margin: 0;
    }
`;

const TodoTitle = styled.div`
    margin: 10px 0;
`;
