import React, { FC } from "react";

import { TextField, TextFieldProps } from "@mui/material";
import { useInput } from "common/hooks/useInput";
/*InputHTMLAttributes<HTMLInputElement> &*/
type PropsType = TextFieldProps & {};

export const Input: FC<PropsType> = ({ onKeyDown, onChange, ...props }) => {
  const { onChangeHandler, onKeyDownHandler } = useInput(onKeyDown, onChange);

  return <TextField {...props} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />;
};
