import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router";

export const ErrorPage = () => {
  return (
    <Body>
      <h1>404</h1>
      <p>page not found</p>
      <Button size={"large"} variant={"contained"} component={Link} to="/">
        на главную страницу
      </Button>
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
  padding: 10px;

  h1 {
    font-size: 300px;
    margin: 0;
    line-height: 1.4;
  }

  p {
    font-size: 50px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 0 2rem;
  }

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
