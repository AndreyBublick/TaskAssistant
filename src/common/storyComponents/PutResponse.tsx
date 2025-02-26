import React, { useEffect, useState } from 'react';
import { Wrapper } from './Wrapper/Wrapper';
import { EditableLi } from './Wrapper/editableLi/EditableLi';
import styled from 'styled-components';
import type { TodolistType } from '../../features/todolists/api/todolistsApi.types';
import type { Model, TaskType } from '../../features/todolists/api/tasksApi.types';
import { _todolistsApi } from '../../features/todolists/api/todolistsApi';
import { tasksApi } from '../../features/todolists/api/tasksApi';

export const PutResponse = () => {
  const [state, setState] = useState<TodolistType[]>([]);
  const [tasks, setTasks] = useState<Record<string, TaskType[]>>({});

  const changeTodoListTitle = (id: string, title: string) => {
    _todolistsApi
      .changeTodolistTitle({
        id,
        title,
      })
      .then(() => setState(prev => (prev ? prev.map(td => (td.id === id ? { ...td, title } : td)) : [])));
  };

  const changeTaskTitle = (todoListId: string, title: string, taskId: string) => {
    const task = tasks[todoListId].find(tsk => tsk.id === taskId) as TaskType;

    const model: Model = {
      title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    tasksApi
      .updateTask({
        todoListId,
        taskId,
        model,
      })
      .then(() =>
        setTasks(prev => ({
          ...prev,
          [todoListId]: prev[todoListId].map(tsk => (tsk.id === taskId ? { ...tsk, title: title } : tsk)),
        })),
      );
  };

  /*changeTaskTitle*/
  useEffect(() => {
    _todolistsApi
      .getTodolists()
      .then(response => {
        setState(response.data);
        return response.data;
      })
      .then(todolists =>
        todolists.forEach(td =>
          tasksApi.getTasks(td.id).then(response => setTasks(prev => ({ ...prev, [td.id]: response.data.items }))),
        ),
      );
  }, []);

  const mappedTodos = state?.map(td => (
    <li key={td.id}>
      <EditableLi key={td.id} idTodoList={td.id} title={td.title} onBlur={changeTodoListTitle} />
      {tasks[td.id] ? (
        <ul>
          {tasks[td.id].map(tsk => (
            <EditableLi
              key={tsk.id}
              title={tsk.title}
              idTodoList={td.id}
              taskId={tsk.id}
              onBlur={changeTaskTitle as (todolistId: string, title: string, taskId?: string | undefined) => void}
            />
          ))}
        </ul>
      ) : (
        false
      )}
    </li>
  ));

  return (
    <Wrapper>
      <List>{mappedTodos}</List>
    </Wrapper>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > ul {
    margin: 0;
    padding: 0;
  }
`;
