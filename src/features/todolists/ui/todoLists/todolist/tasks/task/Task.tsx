import React, {FC, memo, useCallback} from 'react';
import {EditableString} from "../../../../../../../common/components/editableString/EditableString";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useTask} from "../../../../../../../common/hooks/useTask";
import {TaskDomainType} from "../../../../../model/tasks-reducer/tasks-reducer";
import {StatusTask} from "../../../../../../../common/enums/enums";

type Props = {
    task: TaskDomainType
};

export const Task: FC<Props> = memo(({task}) => {
    const {status, title, id} = task;

    const {removeTask, changeTaskStatus, changeTaskTitle} = useTask(id);

   const changeString = useCallback((title:string)=>{
       changeTaskTitle(title);
   },[changeTaskTitle]);

    return <li style={{opacity: `${status === StatusTask.Completed ? 0.5 : 1}`}}>
        <Checkbox
            checked={status === StatusTask.Completed}

            onChange={changeTaskStatus}

            inputProps={{'aria-label': 'controlled'}}
        />
        <EditableString changeString={changeString} title={title}/>
        <IconButton aria-label="delete" size="medium" onClick={removeTask}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </li>
});

