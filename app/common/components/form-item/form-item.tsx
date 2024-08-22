import _ from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HelperText, Chip, useTheme } from 'react-native-paper';

import { AppTheme } from '../../../../App';
import { FormItemProps, FormItemVariants } from './form-item.props';

const FormItem = (props: FormItemProps) => {
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);
  const { chipValue, disabled = false, label, messageDescription, messageError, messageSuccess, onChange, options = [], required = false, variant = FormItemVariants.CHIP, ...otherProps } = props;

  const [internalValueChip, setInternalValueChip] = React.useState<string>(chipValue || '');

  const handleChangeChip = (newValue: string) => {
    setInternalValueChip(newValue);
    onChange?.(newValue);
  };

  const _renderItem = () => {
    switch (variant) {
      case FormItemVariants.CHIP:
        return renderChips();
      //  Handle other variants if needed
      default:
        return renderChips();
    }
  };

  const renderChips = () => {
    return (
      <View style={styles.chipsContainer}>
        {options.map((item, index) => {
          return (
            <Chip key={index} disabled={disabled} selected={internalValueChip === item.value} onPress={() => handleChangeChip(item.value)}>
              {item.label}
            </Chip>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.wrapContent}>
      {label && (
        <View style={styles.contentTextCommon}>
          <Text style={styles.labelText}>{label}</Text>
          {required && <Text style={[styles.labelText, { color: theme.colors.red }]}>*</Text>}
        </View>
      )}
      {_renderItem()}
      {messageDescription && <HelperText type={'info'}>{messageDescription}</HelperText>}
      {messageError && <HelperText type={'error'}>{messageError}</HelperText>}
      {messageSuccess && <HelperText type={'info'}>{messageSuccess}</HelperText>}
    </View>
  );
};

export default React.memo(FormItem);

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    chipsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    clearIcon: {
      height: 24,
      marginRight: 2,
      width: 24,
    },
    contentTextCommon: {
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    disabled: {
      backgroundColor: theme.colors.black60,
    },
    labelText: {
      color: theme.colors.black87,
      fontWeight: 'bold',
      marginBottom: 4,
    },

    wrapContent: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
    },
  });
