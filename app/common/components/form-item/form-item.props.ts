import React from 'react';

export interface FormItemProps {
  status?: 'normal' | 'success' | 'error' | 'readOnly';
  label?: string;
  messageError?: string;
  messageSuccess?: string;
  messageDescription?: string;
  required?: boolean;
  chipValue?: any;
  onChange?: (value?: any) => void;
  right?: React.ReactNode;
  left?: React.ReactNode;
  variant?: FormItemVariants;
  disabled?: boolean;
  options?: {
    label: string;
    value: any;
  }[];
}

export enum FormItemVariants {
  SWITCH = 'switch',
  CHECKBOX = 'checkbox',
  CHIP = 'chip',
}
