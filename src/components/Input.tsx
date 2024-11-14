import React, {ChangeEvent, FC} from 'react';

import styled, {css} from "styled-components";

type PropsType = {

    setValue: (value: string) => void;
    value:string,
    req?:boolean
    error?:null|string,
    onChange?:()=>void,
};

export const Input: FC<PropsType> = ({setValue,onChange,value,req=false,error}) => {

    /*const {value, changeHandler} = useInput();*/

   const  onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
       setValue(e.target.value);
       onChange && onChange();
   };

    return <InputStyled  isError={!!error} required={req} type="text" value={value} onChange={onChangeHandler}/>
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


