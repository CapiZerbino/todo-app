/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { ErrorBoundary } from './app/features/ErrorBoundary';
import { AppNavigator } from './app/navigation';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary catchErrors="prod">
      <AppNavigator />
    </ErrorBoundary>
  );
}

export default App;
