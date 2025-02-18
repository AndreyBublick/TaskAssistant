import type { ReactElement } from "react";
import { Login } from "../../features/login/ui/Login/Login";
import { Main } from "app/Main";
import { ProtectedRoute } from "common/components/ProtectedRoute/ProtectedRoute";
import { ErrorPage } from "common/components/ErrorPage";

export const PATH = {
  LOGIN: "login",
  DEFAULT: "/",
  ALL: "*",
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
  { path: PATH.ALL, element: <ErrorPage /> },
];

export const routes: Route[] = [...privateRoutes, ...publickRoutes];
