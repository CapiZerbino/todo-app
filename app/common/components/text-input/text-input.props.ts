import { TextInputProps as PPTextInputProps } from 'react-native-paper';

export interface TextInputProps extends PPTextInputProps {
  status?: 'normal' | 'success' | 'error' | 'readOnly';
  messageError?: string;
  messageSuccess?: string;
  messageDescription?: string;
  onPress?: (value: any) => void;
  onClear?: () => void;
  focus?: boolean;
  label?: string;
  required?: boolean;
  secure?: boolean;
  area?: boolean;
}
