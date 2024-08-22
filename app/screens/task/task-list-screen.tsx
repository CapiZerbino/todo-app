import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AppTheme } from '../../../App';
import { NavigatorParamList } from '../../common/navigation/app-navigator';
import TaskItem from './components/TaskItem';
import { useTaskList } from './use-task-list';

const TaskListScreen = ({ navigation }: NativeStackScreenProps<NavigatorParamList, 'taskList'>) => {
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);
  const { handleMarkAsDone, handleRefresh, refeshing, status, tasks } = useTaskList();

  if (status === 'loading') {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>{`You haven't created task.`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        style={styles.listTask}
        refreshing={refeshing}
        onRefresh={handleRefresh}
        renderItem={({ index, item }) => {
          return (
            <TaskItem
              key={index + item.id}
              task={item}
              onMarkAsDone={() => {
                handleMarkAsDone(item);
              }}
              onPress={() => {
                navigation.navigate('taskUpdate', {
                  task: item,
                });
              }}
            />
          );
        }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const makeStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    listTask: {
      padding: theme.padding,
    },
  });
};

TaskListScreen.displayName = 'TaskListScreen';
export default TaskListScreen;
