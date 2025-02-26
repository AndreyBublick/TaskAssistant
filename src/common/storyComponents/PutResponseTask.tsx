import { useEffect, useState } from 'react';
import { _tasksApi } from '../../features/todolists/api/tasksApi';

export const PutResponseTask = () => {
  const [state, setState] = useState<any>('');

  useEffect(() => {
    const todoListId = '89f81e42-ce0a-4cdd-a3d6-e2a9ed25acea';

    const id = '';

    _tasksApi.deleteTask({ todoListId, id }).then(() => {
      setState('success');
    });
  }, []);

  return <div>{state ? 'Success' : 'Loading'}</div>;
};
