import { useCallback, useEffect, useRef } from 'react';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HelperText, TextInput as PPTextInput, useTheme } from 'react-native-paper';

import { AppTheme } from '../../../../App';
import { TextInputProps } from './text-input.props';

const TextInput = (props: TextInputProps) => {
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);
  const { area, disabled, focus, label, left, messageDescription, messageError, messageSuccess, onClear, placeholder, required, right, secure, status, style: styleOverride, value, ...rest } = props;
  const inputRef = useRef<any>();

  useEffect(() => {
    if (focus) {
      inputRef?.current?.focus();
    } else {
      inputRef?.current?.blur();
    }
  }, [focus]);

  const onClearPress = useCallback(() => {
    onClear?.();
    rest.onChangeText?.('');
  }, [onClear, rest]);

  const renderTextInput = () => {
    return (
      <PPTextInput
        mode="outlined"
        ref={inputRef}
        dense={area}
        multiline={area}
        secureTextEntry={secure}
        value={value}
        editable={!(status === 'readOnly')}
        textAlign={undefined}
        disabled={disabled}
        numberOfLines={1}
        placeholder={placeholder}
        outlineColor={theme.colors.black12}
        right={
          right ? <PPTextInput.Icon disabled icon={() => right} /> : value && !disabled && status !== 'readOnly' ? <PPTextInput.Icon onPress={() => onClearPress()} size={24} icon={'close'} /> : null
        }
        focusable
        left={left && <PPTextInput.Icon disabled icon={() => left} />}
        contentStyle={[styles.contentTextCommon, disabled && status !== 'readOnly' && styles.disabledText]}
        style={[styles.textInput, styleOverride, area ? styles.multilineArea : styles.singleLineArea]}
        {...rest}
      />
    );
  };

  return (
    <View style={styles.wrapContent}>
      {label && (
        <View style={styles.contentTextCommon}>
          <Text style={styles.labelText}>{label}</Text>
          {required && <Text style={[styles.labelText, styles.requiredText]}>*</Text>}
        </View>
      )}
      {renderTextInput()}
      {messageDescription && <HelperText type={'info'}>{messageDescription}</HelperText>}
      {messageError && <HelperText type={'error'}>{messageError}</HelperText>}
      {messageSuccess && <HelperText type={'info'}>{messageSuccess}</HelperText>}
    </View>
  );
};

export default React.memo(TextInput);

const makeStyles = (theme: any) => {
  return StyleSheet.create({
    contentTextCommon: {
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    disabledText: {
      color: theme.colors.black38,
    },
    labelText: {
      color: theme.colors.black87,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    multilineArea: {
      paddingVertical: Platform.OS === 'ios' ? 0 : 2.5,
    },
    requiredText: {
      color: theme.colors.red,
    },
    singleLineArea: {
      flex: 1,
    },
    textInput: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius,
      height: 48,
      padding: 0,
      textAlign: 'auto',
      width: '100%',
    },
    wrapContent: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
    },
  });
};
