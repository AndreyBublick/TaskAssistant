import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {Input} from "../input/Input";
import {Button} from "@mui/material";
import styled from "styled-components";


type PropsType = {
    callBack: (value: string) => void,




};

export const AddItemForm: FC<PropsType> = memo(({callBack}) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const diactivateEditMode = useCallback(() => {

        if (value.trim()) {
            callBack(value.trim());

            setValue('');
            setError(null);

        } else {
            setError('this field is required');
        }

    },[callBack,value]);


    const onChangeHandler = useCallback(() => {
       if(error!==null){
           setError(null);
       }
    },[error]);



  /*  useEffect(() => {

        defaultValue && setValue(defaultValue);

    }, [defaultValue]);*/

    return <AddItemFormStyled>
        <Input  onKeyDown={diactivateEditMode} onChange={onChangeHandler} error={error} req value={value} setValue={setValue}/>
        <Button disabled={!!error} onClick={diactivateEditMode} variant={"contained"} size={"small"} >+</Button>

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


