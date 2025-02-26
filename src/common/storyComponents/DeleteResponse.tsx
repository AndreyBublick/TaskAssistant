import { useCallback, useState } from 'react';

import { Wrapper } from './Wrapper/Wrapper';
import { Button, TextField } from '@mui/material';
import { _todolistsApi } from '../../features/todolists/api/todolistsApi';

export const DeleteResponse = () => {
  const [state, setState] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const addNewTodolist = useCallback(() => {
    setState(false);
    setId('');

    _todolistsApi.deleteTodolist(id).then(() => setState(true));
  }, [id]);

  return (
    <Wrapper>
      {state ? 'Success' : 'Waiting...'}
      <div>
        <TextField
          id="standard-basic"
          onChange={e => {
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
