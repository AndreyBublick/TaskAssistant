import React, {ChangeEvent, FC, KeyboardEvent} from 'react';


import {TextField} from "@mui/material";

type PropsType = {

    setValue: (value: string) => void,
    value:string,
    req?:boolean,
    error?:null|string,
    onChange?:()=>void,
    onKeyDown?:()=>void,
    autoFocus?:boolean,
    onBlur?:()=>void,
};

export const Input: FC<PropsType> = ({setValue,onBlur,autoFocus,onChange,onKeyDown,value,req=false,error}) => {


   const  onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
       setValue(e.target.value);
       onChange && onChange();
   };
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=>{


        (e.key === 'Enter' && onKeyDown) && onKeyDown();
    };


    return  <TextField label="Your text for a new task" placeholder={'text...'} helperText={error}  variant="standard" autoFocus={autoFocus} error={!!error} onBlur={onBlur} onKeyDown={onKeyDownHandler} required={req} value={value} onChange={onChangeHandler} />
};




