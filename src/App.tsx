import React, {FC, useMemo, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
/*@ts-ignore*/
import uuid from 'react-uuid';



export type FilterValuesType = "all" | "active" | "completed"|'three';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const  App:FC =()=> {
    let [filter, setFilter] = useState<FilterValuesType>("all");
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true},
        {id: '3', title: "ReactJS", isDone: false},
        {id: '4', title: "Rest API", isDone: false},
        {id: '5', title: "GraphQL", isDone: false},
        {id: '6', title: "GraphQL", isDone: false},
    ]);


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const tasksForTodoList = useMemo(() => {

        switch (filter){
            case "active":{
                return tasks.filter(t => !t.isDone);

            }
            case "completed":{
                return tasks.filter(t => t.isDone/* === true*/);

            }
            case "three":{
                return tasks.filter((t,index) => index < 3);

            }
            default:{
                return tasks;
            }
        };


    },[filter,tasks]);


    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }


    const addNewTask = (title: string) => {
        console.log(1);
        setTasks(prev => [{id: uuid(), title: title, isDone: false},...prev ]);
    };

    const changeTaskDone = (id:string,isDone:boolean)=>{
        setTasks(tasks.map(task => task.id === id ? {...task,isDone:isDone} : task));
    };

    return (
        <div className="App">
            <Todolist filter={filter} changeTaskDone={changeTaskDone} setTasks={setTasks} addNewTask={addNewTask} tasks={tasksForTodoList} changeFilter={changeFilter} removeTask={removeTask} title="What to learn"/>
        </div>
    );
}




//-------------------------------------------------------------------------

// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
//
//
// export type FilterValuesType = "all" | "active" | "completed" | "three";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: 1, title: "HTML&CSS", isDone: true},
//         {id: 2, title: "JS", isDone: true},
//         {id: 3, title: "ReactJS", isDone: false},
//         {id: 4, title: "Rest API", isDone: false},
//         {id: 5, title: "GraphQL", isDone: false},
//     ]);
//
//     const deleteAllTasks = () => {
//         setTasks([])
//     }
//
//     function removeTask(id: number) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     // let [filter, setFilter] = useState<FilterValuesType>("all");
//     //
//     // let tasksForTodolist = tasks;
//     //
//     // if (filter === "active") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === false);
//     // }
//     // if (filter === "completed") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === true);
//     // }
//     //
//     // function changeFilter(value: FilterValuesType) {
//     //     setFilter(value);
//     // }
//
//     return (
//         <div className="App">
//             <Todolist
//                 title="What to learn"
//                 tasks={tasks}
//                 removeTask={removeTask}
//                 //changeFilter={changeFilter}
//                 deleteAllTasks={deleteAllTasks}
//
//             />
//         </div>
//     );
// }
//
// export default App;