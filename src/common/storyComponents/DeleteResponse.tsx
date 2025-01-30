import { useCallback, useState } from "react";
import { todolistsApi } from "../../features/todolists/model/api/todolists-api";
import { Wrapper } from "./Wrapper/Wrapper";
import { Button, TextField } from "@mui/material";

export const DeleteResponse = () => {
  const [state, setState] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const addNewTodolist = useCallback(() => {
    setState(false);
    setId("");

    todolistsApi.deleteTodolist(id).then(() => setState(true));
  }, [id]);

  return (
    <Wrapper>
      {state ? "Success" : "Waiting..."}
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
