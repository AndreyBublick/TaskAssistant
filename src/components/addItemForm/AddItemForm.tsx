import React, {FC, useEffect, useState} from 'react';
import {Input} from "../input/Input";
import {Button} from "@mui/material";
import styled from "styled-components";


type PropsType = {
    callBack: (value: string) => void,
    autoFocus?: boolean,
    isDisabledOnBlur?: boolean,
    defaultValue?: string,
    isShowButton?: boolean,

};

export const AddItemForm: FC<PropsType> = ({callBack,isShowButton=true, autoFocus, isDisabledOnBlur=true,defaultValue}) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const diactivateEditMode = () => {

        if (!!value) {
            callBack(value.trim());

            setValue('');
            setError(null);

        } else {
            setError('this field is required');
        }

    };


    const onChangeHandler = () => {
       if(error!==null){
           setError(null);
       }
    };

    const onBlurHandler = () => {

        if (!isDisabledOnBlur) {

            if (!!value) {

                callBack(value.trim());

                setValue('');
                setError(null);

            }

            else {
                setError('this field is required');

            }
        }

    };


    useEffect(() => {

        defaultValue && setValue(defaultValue);
    }, [defaultValue]);

    return <AddItemFormStyled>
        <Input  autoFocus={autoFocus} onKeyDown={diactivateEditMode} onBlur={onBlurHandler} onChange={onChangeHandler} error={error} req={true} value={value} setValue={setValue}/>
        {isShowButton && <Button disabled={!!error} onClick={diactivateEditMode} variant={"contained"} size={"small"} >+</Button>}

    </AddItemFormStyled>;
};

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


