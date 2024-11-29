import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

import {Button} from "./components/button/Button";
import styled from "styled-components";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableString} from "./components/editableString/EditableString";


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
   /* const [selectedTask, setSelectedTask] = useState<string | null>(null);*/


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

                <EditableString autoFocus isDisabledOnBlur={false}  changeString={changeTitleInThisTODO}  title={title}  />
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


                        };

                        return <li key={t.id} style={{opacity: `${t.isDone ? 0.5 : 1}`}} >

                                <EditableString onChange={onChangeHandler} changeString={changeTaskTitleHandler} isDone={t.isDone} title={t.title}  />
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
    
`;

const TodoTitle = styled.div`
    margin: 10px 0;
`;
