import React, {FC} from 'react';
import styled, {css} from "styled-components";

type PropsType = {
    title: string,
    onClick?: () => void,
    disabled?: boolean,
    isActive?: boolean,

};

export const Button:FC<PropsType> = ({title,disabled,onClick,isActive}) => {
    return <ButtonStyled  isActive={isActive} disabled={disabled ? disabled:false } onClick={onClick}>{title}</ButtonStyled>

};
const ButtonStyled = styled.button<{isActive:boolean|undefined}>`

    ${props => props.isActive && css`
    outline: 1px solid yellow;
    background-color: aquamarine;
    `}
    
`;