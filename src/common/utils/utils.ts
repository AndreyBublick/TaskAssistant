import type { ReactElement } from 'react';
import { cloneElement } from 'react';

export const dublicatesComponents = ({ quantity, item }: { quantity: number; item: ReactElement }): ReactElement[] => {
  return Array.from({ length: quantity }, (_, i) => cloneElement(item, { key: i }));
};
export const getLastItem = <T>(arr: T[]): T => {
  return arr[arr.length - 1];
};
