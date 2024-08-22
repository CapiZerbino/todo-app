import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button } from '../../../common/components';
import { Task } from '../../../features/tasks';

export interface TaskItemProps {
  task: Task;
  onPress?: () => void;
  loading?: boolean;
  onMarkAsDone?: () => void;
}

const TaskItem = (props: TaskItemProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { loading, onMarkAsDone, onPress, task } = props;
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.taskItemContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        <Button title={loading ? 'Loading...' : 'Mark as done'} onPress={onMarkAsDone} loading={loading} disabled={loading} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TaskItem);

const makeStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listTask: {
      paddingHorizontal: theme.padding,
    },
    taskDescription: {
      color: theme.colors.black60,
      fontSize: 14,
      marginTop: 8,
    },
    taskItemContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing,
      marginVertical: theme.marginVertical,
      padding: theme.padding,
    },
    taskTitle: {
      fontSize: 16,
    },
  });
};
