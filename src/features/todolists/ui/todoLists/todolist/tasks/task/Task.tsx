import React, {FC, memo} from 'react';
import {EditableString} from "../../../../../../../common/components/editableString/EditableString";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../../../../../../../app/App";
import {useTask} from "../../../../../../../common/hooks/useTask";

type Props = {
  task:TaskType
};

export const Task: FC<Props> = memo(({task}) => {
const {isDone,title,id} = task;

const {removeTask,changeTaskDone,changeTaskTitle} = useTask(id);



    return <li style={{opacity: `${isDone ? 0.5 : 1}`}}>
        <Checkbox
            checked={isDone}
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

