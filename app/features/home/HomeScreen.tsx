import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { AccountScreen } from '../account';
import { TodoListScreen } from '../todo-list';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Todo" component={TodoListScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

HomeScreen.displayName = 'HomeScreen';
export default HomeScreen;
