import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableString} from "../../editableString/EditableString";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../../store/task-reducer/task-reducer";
import {useAppDispatch} from "../../../hooks/Hooks";

type PropsType = {
    id: string,
    todoId:string,
    isDone: boolean,
    title: string,
};

export const Task: FC<PropsType> = memo(({todoId, id, isDone, title}) => {
    const dispatch = useAppDispatch();

    const onClickRemoveTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(todoId, id));
    },[todoId,id,dispatch]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTaskAC(todoId, id, e.currentTarget.checked));
    },[todoId,id,dispatch]);

    const changeTaskTitleHandler = useCallback((inputValue: string) => {
        dispatch(changeTitleTaskAC(todoId, id, inputValue));
    },[dispatch,todoId, id]);


    return <li style={{opacity: `${isDone ? 0.5 : 1}`}}>
       {/* {onChange &&*/} <Checkbox
            checked={isDone}
            onChange={onChangeHandler}
            inputProps={{'aria-label': 'controlled'}}
        />{/*}*/}

        {/*onChange={onChangeHandler}*/}
        <EditableString  changeString={changeTaskTitleHandler}
                        title={title}/>
        <IconButton aria-label="delete" size="small" onClick={onClickRemoveTaskHandler}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </li>;
});

