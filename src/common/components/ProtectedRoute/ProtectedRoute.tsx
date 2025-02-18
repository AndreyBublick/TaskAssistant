import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { PATH } from "common/routes/routes";
import { useAppSelector } from "common/hooks/Hooks";
import { getIsAuth } from "../../../features/login/model/auth-reducer/auth-reducer";

type Props = {
  children: ReactNode;
};
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth);

  return <>{isAuth ? children : <Navigate to={PATH.LOGIN} />}</>;
};
