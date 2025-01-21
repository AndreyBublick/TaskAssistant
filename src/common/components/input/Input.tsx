import React, {ChangeEvent, FC, KeyboardEvent} from 'react';


import {TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";

type PropsType = /*InputHTMLAttributes<HTMLInputElement> &*/ {


    value:string,
    req?:boolean,
    error?:null|string,
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void,
    onKeyDown?:(e:KeyboardEvent<HTMLInputElement>)=>void,
    autoFocus?:boolean,
    onBlur?:()=>void,
};

export const Input: FC<PropsType> = ({onBlur,autoFocus,onChange,onKeyDown,value,req,error}) => {


   const {onChangeHandler,onKeyDownHandler} = useInput(onKeyDown,onChange);


    return  <TextField label="Your text for a new task" placeholder={'text...'} helperText={error}  variant="outlined" autoFocus={autoFocus} error={!!error} onBlur={onBlur} onKeyDown={onKeyDownHandler} required={req} value={value} onChange={onChangeHandler} />
};




