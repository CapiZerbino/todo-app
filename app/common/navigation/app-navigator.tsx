import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '../../screens/home';
import { TaskCreateScreen, TaskListScreen, TaskUpdateScreen } from '../../screens/task';
import { TaskUpdateScreenProps } from '../../screens/task/task-update-screen';

const Stack = createNativeStackNavigator<NavigatorParamList>();

export type NavigatorParamList = {
  home: undefined;
  account: undefined;
  taskList: undefined;
  taskCreate: undefined;
  taskUpdate: TaskUpdateScreenProps;
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          animationTypeForReplace: 'push',
          headerShadowVisible: true,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="taskList"
          component={TaskListScreen}
          options={{
            headerShown: false,
            title: 'Task List',
          }}
        />
        <Stack.Screen
          name="taskCreate"
          component={TaskCreateScreen}
          options={{
            headerShown: true,
            title: 'Create task',
          }}
        />
        <Stack.Screen
          name="taskUpdate"
          component={TaskUpdateScreen}
          options={{
            headerShown: true,
            title: 'Update task',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';
export default AppNavigator;
