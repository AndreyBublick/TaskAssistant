import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { PATH } from 'common/routes';
import { useAppSelector } from 'common/hooks';
import { getIsAuth } from '../../../features/login/model/authSlice/authSlice';

type Props = {
  children: ReactNode;
};
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth);

  return <>{isAuth ? children : <Navigate to={PATH.LOGIN} />}</>;
};
