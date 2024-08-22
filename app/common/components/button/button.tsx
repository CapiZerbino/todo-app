import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PPButton, useTheme } from 'react-native-paper';

import { ButtonProps } from './button.props';

const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { mode, style: styleOverride, title, ...otherProps } = props;
  const defaultMode = mode || 'contained';
  return (
    <PPButton style={[styles.button, styleOverride]} mode={defaultMode} {...otherProps}>
      {title}
    </PPButton>
  );
};

const makeStyles = (theme: any) => {
  return StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius,
    },
  });
};

export default React.memo(Button);
