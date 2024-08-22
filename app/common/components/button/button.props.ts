import { ButtonProps as PPButtonProps } from 'react-native-paper';

export interface ButtonProps extends Omit<PPButtonProps, 'children'> {
  title?: string;
}
