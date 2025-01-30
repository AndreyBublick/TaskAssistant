import { styled } from "@mui/material/styles";
import { Button, ButtonProps } from "@mui/material";

import React, { FC } from "react";

export const MenuButton: FC<ButtonProps> = (props) => {
  return (
    <ButtonStyled {...props} variant={"contained"}>
      Login
    </ButtonStyled>
  );
};

const ButtonStyled = styled(Button)(({ theme }) => ({
  boxShadow: `4px 4px 0px -0px ${theme.palette.primary.dark}`,
  "&:hover": {
    boxShadow: `4px 4px 2px 0px ${theme.palette.primary.light}`,
  },
  minWidth: 100,
  fontWeight: 600,
  border: `2px solid ${theme.palette.primary.dark}`,
}));
