import React, {ChangeEvent,KeyboardEvent,FC, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Input} from "./components/Input";
import {Button} from "./components/button/Button";
import styled from "styled-components";



type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string,idTodoLists:string) => void,
    changeFilter: (value: FilterValuesType,idTodoLists:string) => void,
    addNewTask: (title: string,idTodoLists:string) => void,
    deleteTodoList:(idTodoLists:string)=>void,
    changeTaskDone: (id: string, isDone: boolean,idTodoLists:string) => void,
    filter:FilterValuesType,
    id:string,
    removeAllTasks:(idTodoLists:string)=>void,
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
                                        }) => {


    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<null|string>(null);

    const addNewTaskHandler = () => {

        if (!!value) {
            addNewTask(value.trim(),id);
            setValue('');
            setError(null);

        }
        else {
            setError('this field is required');

        }

    };
    const removeTasks = () => {
        removeAllTasks(id);
    };



    /*
    const changeFilterHandler = (filter:FilterValuesType)=>{};
    */
const resetErrorHandler = ()=>{
    setError(null);
};
    return <div>
        <FlexWrapper>
            <h3>{title}</h3>
            <Button title={'X'} onClick={() => deleteTodoList(id)}/>
        </FlexWrapper>
        <div>
            <Input onKeyDown={addNewTaskHandler} onChange={resetErrorHandler} error={error} req={true} value={value} setValue={setValue}/>
            <Button disabled={!!error} title={'+'} onClick={addNewTaskHandler}/>
            { error && <span style={{color:"red",display:"block"}}>this field required</span>}

        </div>
        {tasks.length > 0 ? <ul>
            {
                tasks.map(t => {
                    const onClickRemoveTaskHandler = () => {
                        removeTask(t.id,id);
                    };
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskDone(t.id, e.currentTarget.checked,id);
                    };

                    return <li style={{opacity: `${t.isDone ? 0.5 : 1}`}} key={t.id}>
                        <input  onChange={onChangeHandler} type="checkbox"
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickRemoveTaskHandler}>x</button>
                    </li>
                })
            }
        </ul>:<h2>Задачи отсутсвуют</h2>}
        <Button title={'delete all'} onClick={removeTasks}/>

        <div>

            <Button isActive={filter === 'all'} title={'all'} onClick={() => {
                changeFilter("all",id);
            }}/>
            <Button isActive={filter === 'active'} title={'Active'} onClick={() => {
                changeFilter("active",id);
            }}/>
            <Button isActive={filter === "completed"} title={'Completed'} onClick={() => {
                changeFilter("completed",id);
            }}/>
            <Button isActive={filter === 'three'} title={'first 3'} onClick={() => {
                changeFilter("three",id);
            }}/>


        </div>
    </div>
}



const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;


//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }