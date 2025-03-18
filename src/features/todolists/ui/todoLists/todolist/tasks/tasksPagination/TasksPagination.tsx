import React, { FC } from 'react';
import Pagination, { PaginationProps } from '@mui/material/Pagination';

type Props = {
  onChangePage: (page: number) => void;
} & PaginationProps;

export const TasksPagination: FC<Props> = ({ onChangePage, ...props }) => {
  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    onChangePage(page);

    props.onChange?.(e, page);
  };

  return <Pagination {...props} onChange={onChangeHandler} />;
};
