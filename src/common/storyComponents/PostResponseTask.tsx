import { useCallback, useState } from "react";
import { todolistsApi } from "../../features/todolists/model/api/todolists-api";
import { Button, TextField } from "@mui/material";
import { Wrapper } from "./Wrapper/Wrapper";

export const PostResponseTask = () => {
  const [state, setState] = useState<boolean>(false);
  const [idTL, setIdTL] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const addNewTodolist = useCallback(() => {
    setState(false);

    setIdTL("");
    setTitle("");
    todolistsApi.createTask({ todoListId: idTL, title: "3232" }).then(() => setState(true));
  }, [idTL]);

  return (
    <Wrapper>
      {state ? "Success" : "Waiting..."}
      <div>
        <TextField
          id="standard-basic"
          onChange={(e) => {
            setIdTL(e.currentTarget.value);
          }}
          value={idTL}
          label="ID Todolist"
          variant="standard"
        />

        <TextField
          id="standard-basic"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          value={title}
          label="Title"
          variant="standard"
        />

        <Button disabled={!idTL || !title} variant="contained" onClick={addNewTodolist}>
          Add
        </Button>
      </div>
    </Wrapper>
  );
};
