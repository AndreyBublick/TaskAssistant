import React, { FC, memo, useCallback, useContext } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { useAppDispatch } from 'common/hooks';
import { TodolistContext } from 'common/contexts';
import { todolistsApi } from '../../../../api/todolistsApi';
import type { FilterValues } from '../../../../lib/types/types';

type Props = {
  filter: FilterValues;
};

export const FilterButtons: FC<Props> = memo(({ filter }) => {
  const dispatch = useAppDispatch();
  const id = useContext(TodolistContext);

  const changeFilter = useCallback(
    (filter: FilterValues) => {
      /*dispatch(updateTodoListFilter({ id, filter }));*/
      dispatch(
        todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
          const index = state.findIndex(t => t.id === id);
          if (index !== -1) {
            state[index].filter = filter;
          }
        }),
      );
    },
    [dispatch, id],
  );

  const renderButton = ({ currentFilter }: { currentFilter: FilterValues }) => {
    return (
      <Button
        size={'small'}
        variant={filter === currentFilter ? 'contained' : 'text'}
        title={currentFilter}
        onClick={() => {
          changeFilter(currentFilter);
        }}>
        {currentFilter}
      </Button>
    );
  };

  return (
    <ButtonsWrapper>
      {renderButton({ currentFilter: 'all' })}
      {renderButton({ currentFilter: 'active' })}
      {renderButton({ currentFilter: 'completed' })}
      {renderButton({ currentFilter: 'first 3' })}
      {/* <Button
        size={'small'}
        variant={filter === 'all' ? 'contained' : 'text'}
        title={'all'}
        onClick={() => {
          changeFilter('all');
        }}>
        all
      </Button>*/}
      {/*<Button
        size={'small'}
        variant={filter === 'active' ? 'contained' : 'text'}
        title={'Active'}
        onClick={() => {
          changeFilter('active');
        }}>
        active
      </Button>*/}
      {/*  <Button
        size={'small'}
        variant={filter === 'completed' ? 'contained' : 'text'}
        title={'Completed'}
        onClick={() => {
          changeFilter('completed');
        }}>
        Completed
      </Button>*/}
      {/*<Button
        size={'small'}
        variant={filter === 'three' ? 'contained' : 'text'}
        title={'first 3'}
        onClick={() => {
          changeFilter('three');
        }}>
        first 3
      </Button>*/}
    </ButtonsWrapper>
  );
});

const ButtonsWrapper = styled.div`
  /* padding: 20px 0;*/
  margin-top: 15px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;
