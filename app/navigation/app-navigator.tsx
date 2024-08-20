import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../features/home';
import {TodoListScreen} from '../features/todo-list';
import {AccountScreen} from '../features/account';
import React from 'react';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animationTypeForReplace: 'push',
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todo" component={TodoListScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';
export default AppNavigator;
