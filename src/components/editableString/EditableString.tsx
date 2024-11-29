import React, {ChangeEvent, FC, useState} from 'react';
import {AddItemForm} from "../addItemForm/AddItemForm";
import styled from "styled-components";


type PropsType = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    isDone?: boolean,
    title: string,
    changeString: (inputValue: string) => void,
    isDisabledOnBlur?: boolean,
    autoFocus?: boolean,
};

export const EditableString: FC<PropsType> = ({onChange, isDone=false, title, changeString}) => {

    const [editMode, setEditMode] = useState(false);

    const diactivateEditMode = (inputValue: string)=>{
        setEditMode(false);
        changeString(inputValue);
    };
    const activateEditMode = ()=>{
        setEditMode(true);
    };


    return editMode ?
        <AddItemForm autoFocus isDisabledOnBlur={false} defaultValue={title} callBack={diactivateEditMode}/> : <>

            {onChange && <input onChange={onChange} type="checkbox" checked={isDone}/>}

                {onChange ? <span onDoubleClick={activateEditMode}>{title}</span>: <TitleTodoList onDoubleClick={activateEditMode}>{title}</TitleTodoList> }


        </>
};

const TitleTodoList = styled.h2`
    font-size: 22px;
    margin: 0;
`;

