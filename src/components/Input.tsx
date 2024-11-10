import React, {ChangeEvent, FC, useEffect} from 'react';
import {useInput} from "../hooks/useInput";

type PropsType = {

    setValue: (value: string) => void;
    value:string,
    req?:boolean
};

export const Input: FC<PropsType> = ({setValue,value,req=false}) => {

    /*const {value, changeHandler} = useInput();*/

   const  onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
       setValue(e.target.value);
   };

    return <input required={req} type="text" value={value} onChange={onChangeHandler}/>
};

