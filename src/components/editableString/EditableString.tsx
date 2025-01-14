import React, {ChangeEvent, FC, memo, useCallback, useState} from 'react';
import {AddItemForm} from "../addItemForm/AddItemForm";
import styled from "styled-components";
import {Checkbox} from "@mui/material";


type PropsType = {


    title: string,
    changeString: (inputValue: string) => void,
    isDisabledOnBlur?: boolean,
    autoFocus?: boolean,
    weightText?:boolean,
};

export const EditableString: FC<PropsType> = memo (({ title, changeString,weightText}) => {

    const [editMode, setEditMode] = useState(false);


    const deactivateEditMode = useCallback ((inputValue: string) => {
        setEditMode(false);
        changeString(inputValue);
    },[changeString]);


    const activateEditMode = useCallback ( () => {
        setEditMode(true);
    },[]);


    return editMode ?
        <AddItemForm isShowButton={!editMode} autoFocus isDisabledOnBlur={false} defaultValue={title}
                     callBack={deactivateEditMode}/> : <>


        {weightText ?  <TitleTodoList onDoubleClick={activateEditMode}>{title}</TitleTodoList> : <span onDoubleClick={activateEditMode}>{title}</span>

}
</>
});

const TitleTodoList = styled.h2`
    font-size: 22px;
    margin: 0;
`;

