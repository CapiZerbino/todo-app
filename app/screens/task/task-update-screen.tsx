import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AppTheme } from '../../../App';
import { Button, TextInput } from '../../common/components';
import { NavigatorParamList } from '../../common/navigation/app-navigator';
import { Task } from '../../features/tasks';
import { useTaskUpdate } from './use-task-update';

export interface TaskUpdateScreenProps {
  task: Task;
}

const TaskUpdateScreen = ({ route }: NativeStackScreenProps<NavigatorParamList, 'taskUpdate'>) => {
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);
  const { task } = route.params;
  const { control, getMessageError, handleSubmit, isValid, onDeleteTask, onUpdateTask } = useTaskUpdate(task);

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
        <Button onPress={handleSubmit(onUpdateTask)} disabled={!isValid} title="Update task" style={styles.buttonContainer} />
        <Button onPress={handleSubmit(onDeleteTask)} textColor="red" mode="text" disabled={!isValid} title="Delete task" style={styles.buttonContainer} />
      </View>
    </ScrollView>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    buttonContainer: {
      marginVertical: theme.marginVertical,
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      flex: 1,
      gap: theme.spacing,
      marginTop: theme.marginTop,
      padding: theme.padding,
    },
    scrollContainer: {
      flex: 1,
    },
    textInput: {
      marginVertical: theme.marginVertical,
    },
  });

TaskUpdateScreen.displayName = 'TaskUpdateScreen';
export default TaskUpdateScreen;
