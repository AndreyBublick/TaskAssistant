import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Wrapper } from "./Wrapper/Wrapper";
import { tasksApi } from "../../features/todolists/api/tasksApi";

export const GetResponseTask = () => {
  const [state, setState] = useState<Array<any> | null>(null);
  const [id, setId] = useState<string>("");

  const addNewTodolist = useCallback(() => {
    setState(null);
    setId("");

    tasksApi.getTasks(id).then((response) => setState(response.data.items));
  }, [id]);

  return (
    <Wrapper>
      {state ? JSON.stringify(state) : "Waiting..."}
      <div>
        <TextField
          id="standard-basic"
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
          value={id}
          label="Id Todolist"
          variant="standard"
        />

        <Button disabled={!id} variant="contained" onClick={addNewTodolist}>
          Delete
        </Button>
      </div>
    </Wrapper>
  );
};
