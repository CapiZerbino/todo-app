import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AppTheme } from '../../../App';
import { Button, TextInput } from '../../common/components';
import { NavigatorParamList } from '../../common/navigation/app-navigator';
import { useTaskCreate } from './use-task-create';

const TaskCreateScreen = ({}: NativeStackScreenProps<NavigatorParamList, 'taskCreate'>) => {
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);
  const { control, getMessageError, handleSubmit, isValid, onSubmit } = useTaskCreate();

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Controller
          name={'title'}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput required label={'Title'} placeholder={'Enter title'} onChangeText={onChange} onBlur={onBlur} value={value} style={styles.textInput} messageError={getMessageError('title')} />
          )}
        />
        <Controller
          name={'description'}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Description'}
              placeholder={'Enter description'}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.textInput}
              messageError={getMessageError('description')}
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmit)} disabled={!isValid} title="Add task" style={styles.buttonContainer} />
      </View>
    </ScrollView>
  );
};

const makeStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    buttonContainer: {
      marginVertical: theme.margin,
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      flex: 1,
      marginTop: 4,
      padding: theme.padding,
    },
    scrollContainer: {
      flex: 1,
    },
    textInput: {
      marginVertical: theme.margin,
    },
  });
};

TaskCreateScreen.displayName = 'TaskCreateScreen';
export default TaskCreateScreen;
