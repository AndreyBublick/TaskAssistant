import type { ReactElement } from "react";
import { Login } from "../../features/login/ui/Login/Login";
import { Main } from "app/Main";
import { ProtectedRoute } from "common/components/ProtectedRoute/ProtectedRoute";

export const PATH = {
  LOGIN: "login",
  DEFAULT: "/",
} as const;

export type Path = typeof PATH;

export type Route = {
  path: Path[keyof Path];
  element: ReactElement;
};

const privateRoutes: Route[] = [];
const publickRoutes: Route[] = [
  { path: PATH.LOGIN, element: <Login /> },
  {
    path: PATH.DEFAULT,
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
];

export const routes: Route[] = [...privateRoutes, ...publickRoutes];
