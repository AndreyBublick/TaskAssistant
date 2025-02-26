import { useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Wrapper } from './Wrapper/Wrapper';
import { _tasksApi } from '../../features/todolists/api/tasksApi';

export const PostResponseTask = () => {
  const [state, setState] = useState<boolean>(false);
  const [idTL, setIdTL] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const addNewTodolist = useCallback(() => {
    setState(false);

    setIdTL('');
    setTitle('');
    _tasksApi.createTask({ todoListId: idTL, title: '3232' }).then(() => setState(true));
  }, [idTL]);

  return (
    <Wrapper>
      {state ? 'Success' : 'Waiting...'}
      <div>
        <TextField
          id="standard-basic"
          onChange={e => {
            setIdTL(e.currentTarget.value);
          }}
          value={idTL}
          label="ID Todolist"
          variant="standard"
        />

        <TextField
          id="standard-basic"
          onChange={e => {
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
