import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {Input} from "../input/Input";
import {Button} from "@mui/material";
import styled from "styled-components";
import {useAddItemForm} from "../../hooks/useAddItemForm";


type PropsType = {
    callBack: (value: string) => void,




};

export const AddItemForm: FC<PropsType> = memo(({callBack}) => {


    const {value,error,deactivateEditMode,onChangeHandler} = useAddItemForm(callBack);


    return <AddItemFormStyled>
        <Input  onKeyDown={deactivateEditMode} onChange={onChangeHandler} error={error} req value={value} />
        <Button disabled={!!error} onClick={deactivateEditMode} variant={"contained"} size={"small"} >+</Button>

    </AddItemFormStyled>;
});

const AddItemFormStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
        

    label + div + p {
        position: absolute;
        color: #2cc5d2;
        top: 102%;
    }
`;


