import React, {FC, memo} from 'react';
import {EditableString} from "../../../../../../../common/components/editableString/EditableString";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useTask} from "../../../../../../../common/hooks/useTask";
import {TaskDomainType} from "../../../../../model/task-reducer/task-reducer";
import {StatusTask} from "../../../../../model/api/todolists-api";

type Props = {
  task:TaskDomainType
};

export const Task: FC<Props> = memo(({task}) => {
const {status,title,id} = task;

const {removeTask,changeTaskDone,changeTaskTitle} = useTask(id);



    return <li style={{opacity: `${status === StatusTask.Completed ? 0.5 : 1}`}}>
        <Checkbox
            checked={status === StatusTask.Completed}
            onChange={changeTaskDone}
            inputProps={{'aria-label': 'controlled'}}
        />
        <EditableString  changeString={changeTaskTitle}
                        title={title}/>
        <IconButton aria-label="delete" size="medium" onClick={removeTask}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </li>
});

