import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { PATH } from "common/routes/routes";

type Props = {
  children: ReactNode;
};
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = true;

  return <>{isAuth ? children : <Navigate to={PATH.LOGIN} />}</>;
};
