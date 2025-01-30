import { useEffect, useState } from "react";
import { todolistsApi } from "../../features/todolists/model/api/todolists-api";

export const PutResponseTask = () => {
  const [state, setState] = useState<any>("");

  useEffect(() => {
    const todoListId = "89f81e42-ce0a-4cdd-a3d6-e2a9ed25acea";

    const id = "";

    todolistsApi.deleteTask({ todoListId, id }).then(() => {
      setState("success");
    });
  }, []);

  return <div>{state ? "Success" : "Loading"}</div>;
};
