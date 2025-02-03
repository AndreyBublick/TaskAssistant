import { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Wrapper } from "./Wrapper/Wrapper";
import { todolistsApi } from "../../features/todolists/api/todolistsApi";

export const PostResponse = () => {
  const [state, setState] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const addNewTodolist = useCallback(() => {
    setState(false);
    setTitle("");

    todolistsApi.addTodolist(title).then(() => setState(true));
  }, [title]);

  return (
    <Wrapper>
      {state ? "Success" : "Waiting..."}
      <div>
        <TextField
          id="standard-basic"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          value={title}
          label="Title"
          variant="standard"
        />

        <Button disabled={!title} variant="contained" onClick={addNewTodolist}>
          Add
        </Button>
      </div>
    </Wrapper>
  );
};
