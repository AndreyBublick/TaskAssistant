import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

import styled, {css} from "styled-components";

type PropsType = {

    setValue: (value: string) => void;
    value:string,
    req?:boolean
    error?:null|string,
    onChange?:()=>void,
    onKeyDown?:()=>void,
    autoFocus?:boolean,
    onBlur?:()=>void,
};

export const Input: FC<PropsType> = ({setValue,onBlur,autoFocus,onChange,onKeyDown,value,req=false,error}) => {

    /*const {value, changeHandler} = useInput();*/

   const  onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
       setValue(e.target.value);
       onChange && onChange();
   };
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=>{


        (e.key === 'Enter' && onKeyDown) && onKeyDown();
    };

    return <InputStyled autoFocus={autoFocus} onBlur={onBlur} onKeyDown={onKeyDownHandler}  isError={!!error} required={req} type="text" value={value} onChange={onChangeHandler}/>
};
const InputStyled = styled.input<{isError:boolean|undefined}>`

    
    ${props => props.isError && css<{isError:boolean|undefined}>`
        border: 1px solid red;
    &:focus-visible{
        border: 1px solid red;  
        outline: 1px solid red;
        
    }
    
    ` }
    
   
`;


