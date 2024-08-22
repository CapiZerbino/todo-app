/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Color from 'color';
import React from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { AppNavigator } from './app/common/navigation';
import store from './app/common/store/store';
import { ErrorBoundary } from './app/screens/ErrorBoundary';

const theme = {
  ...DefaultTheme,
  borderRadius: 8,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    black12: Color('#000').alpha(0.12).rgb().string(),
    black38: Color('#000').alpha(0.38).rgb().string(),
    black4: Color('#000').alpha(0.04).rgb().string(),
    black60: Color('#000').alpha(0.6).rgb().string(),
    black8: Color('#000').alpha(0.08).rgb().string(),
    black87: Color('#000').alpha(0.87).rgb().string(),
    primary: '#7C48C6',
    red: '#f00',
    secondary: '#FFC107',
    white: '#fff',
  },
  margin: 16,
  marginTop: 4,
  marginVertical: 8,
  padding: 16,
  spacing: 8,
};

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <ErrorBoundary catchErrors="prod">
          <AppNavigator />
        </ErrorBoundary>
      </Provider>
    </PaperProvider>
  );
}

export default App;
export type AppTheme = typeof theme;
