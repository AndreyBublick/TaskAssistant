import { FC } from "react";



type taskType = { taskId: number, title: string, isDone: boolean };
type propsType = {

    data: {
        title: string,
        tasks: taskType[],
        students: string[],
    },

};


export const Tasks: FC<propsType> = ({ data }) => {
    return <div>
        <h2>{data.title}</h2>
        <ul>
    {data.tasks.map((task)=><li key={task.taskId}>{task.title}</li>)}
        </ul>
    </div>

}

