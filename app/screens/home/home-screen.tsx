import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

import { Button } from '../../common/components';
import { NavigatorParamList } from '../../common/navigation/app-navigator';
import { TaskListScreen } from '../task';

const Tab = createBottomTabNavigator<NavigatorParamList>();

const HomeScreen = ({ navigation }: NativeStackScreenProps<NavigatorParamList, 'home'>) => {
  const theme = useTheme();
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name="taskList"
        component={TaskListScreen}
        options={{
          headerRight: () => <Button title="Add" mode="text" onPress={() => navigation.navigate('taskCreate')} />,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused, size }) => {
            return <Ionicons name={'task'} size={size} color={color} />;
          },
          tabBarInactiveTintColor: 'gray',
          title: 'Task List',
        }}
      />
    </Tab.Navigator>
  );
};

HomeScreen.displayName = 'HomeScreen';
export default HomeScreen;
