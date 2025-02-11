import type { FC } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { getIsAuth, login } from "../../model/auth-slice/authSlice";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { Navigate } from "react-router";

type Props = {};
export const Login: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  const formik = useFormik({
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      } else if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(login(values));

      /* alert(JSON.stringify(values, null, 2));*/
    },
  });

  return (
    <>
      {isAuth ? (
        <Navigate to={"/"} />
      ) : (
        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={formik.handleSubmit}>
            <BoxStyled>
              <TypographyStyled fontWeight={700} variant={"h5"}>
                Sign in
              </TypographyStyled>

              <TypographyStyled variant={"body1"}>Welcome, please sign in to continue</TypographyStyled>
              {formik.errors.email && <div>Email is required</div>}
              <TextFieldStyled
                {...formik.getFieldProps("email")}
                size={"small"}
                name={"email"}
                label="Email"
                type={"email"}
                variant="outlined"
              />
              {formik.errors.password && <div>Password is required</div>}
              <TextFieldStyled
                {...formik.getFieldProps("password")}
                size={"small"}
                type={"password"}
                label="Password"
                variant="outlined"
              />
              <FormControlLabel
                sx={{ marginBottom: "10px" }}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                label="Remember me"
              />
              <Button
                size={"large"}
                variant="contained"
                type="submit"
                sx={{ fontWeight: 700, textTransform: "capitalize", fontSize: "16px" }}
              >
                sign in
              </Button>
            </BoxStyled>
          </form>
        </Container>
      )}
    </>
  );
};

const TypographyStyled = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
  textAlign: "center",
}));
const BoxStyled = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  width: "400px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  padding: "50px",
  /* alignItems: "center",*/
  justifyContent: "center",
}));
const TextFieldStyled = styled(TextField)(({ theme }) => ({
  margin: "10px 0",
}));
