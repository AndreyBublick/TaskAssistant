import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import styled from "styled-components";


type Props = {
    idTodoList:string,
    taskId?:string,
    title: string,
    onBlur:( todolistId: string, title: string,taskId?:string ,) => void,
};

export const EditableLi:FC<Props> = memo(({idTodoList,taskId,title,onBlur}) => {

const [editableMode,setEditableMode] = useState<boolean>(false);

const [value,setValue] = useState<string>('');

const onDoubleClickHandler = (e:any)=> {
    setEditableMode(true);
};
const onBlurHandler = ()=> {

    onBlur(idTodoList,value,taskId);
    setEditableMode(false);


};
const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setValue(e.currentTarget.value);
};

useEffect(()=>{
    setValue(title);
},[title])

    return <>
        {editableMode ? <TextField value={value} autoFocus onChange={onChangeHandler} onBlur={onBlurHandler} variant={'standard'} /> : <SpanStyled onDoubleClick={onDoubleClickHandler}>{title}</SpanStyled>}
    </>
});


const SpanStyled = styled.li`
display: block;
    padding: 15px 0;
`;
