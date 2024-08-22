export interface CheckboxProps {
  label?: string;
  type?: 'square' | 'circle';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
