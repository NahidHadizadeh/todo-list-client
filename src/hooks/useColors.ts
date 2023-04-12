import { useContext } from 'react';
import { colorContext } from '../theme';

export const useColors = () => {
  const colors = useContext(colorContext);

  return colors;
};
