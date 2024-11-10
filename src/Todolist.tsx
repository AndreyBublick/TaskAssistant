import React, {FC, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Input} from "./components/Input";
import {Button} from "./components/button/Button";




type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addNewTask :(title:string) => void,
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
}





export const Todolist:FC<PropsType> = ({title,tasks,removeTask,changeFilter,setTasks,addNewTask})=>{





const [value,setValue] = useState<string>('');

const addNewTaskHandler = ()=>{
    value && addNewTask(value);
    setValue('');


};
const removeTasks = ()=>{
    setTasks([]);
};
/*
const changeFilterHandler = (filter:FilterValuesType)=>{};
*/

    return <div>
        <h3>{title}</h3>
        <div>
            <Input req={true} value={value}  setValue={setValue} />
            <Button title={'+'} onClick={addNewTaskHandler} />
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickRemoveTaskHandler = () => {
                        removeTask(t.id);
                    };

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickRemoveTaskHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <Button title={'delete all'} onClick={removeTasks} />

        <div>

            <Button title={'all'} onClick={() => {changeFilter("all");}} />
            <Button title={'Active'} onClick={() => {changeFilter("active");}} />
            <Button title={'Completed'} onClick={() => {changeFilter("completed");}} />
            <Button title={'first 3'} onClick={() => {changeFilter("three");}} />


        </div>
    </div>
}


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