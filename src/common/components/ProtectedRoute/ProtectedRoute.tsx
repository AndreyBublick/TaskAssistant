import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { PATH } from 'common/routes';
import { useAppSelector } from 'common/hooks';
import { selectIsAuth } from 'app/appSlice';

type Props = {
  children: ReactNode;
};
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector(selectIsAuth);

  return <>{isAuth ? children : <Navigate to={PATH.LOGIN} />}</>;
};
