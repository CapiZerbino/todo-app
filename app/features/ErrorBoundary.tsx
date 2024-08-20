import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

import { logger } from '../utils';

interface Props {
	children: ReactNode;
	catchErrors: 'always' | 'dev' | 'prod' | 'never';
}

/**
 * This component handles whenever the user encounters a JS error in the app. It follows the "error boundary" pattern in React. We're using a
 * class component because, according to the documentation, only class components can be error boundaries.
 */
export class ErrorBoundary extends Component<Props, any> {
	get showRestartAlert(): boolean {
		// Only enable if we're catching errors in the right environment
		return this.props.catchErrors === 'always' || (this.props.catchErrors === 'dev' && __DEV__) || (this.props.catchErrors === 'prod' && !__DEV__);
	}

	// This will run if an error in a child component is encountered
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		logger.error('Uncaught UI error:', error);
		logger.error('Uncaught UI errorInfo:', errorInfo);

		if (this.showRestartAlert) {
			Alert.alert('Uncaught Error', '', [
				{
					onPress: () => RNRestart.Restart(),
					style: 'cancel',
					text: 'Uncaught Error',
				},
			]);
		}

	}

	// This needs to be implemented or React throws an error
	static getDerivedStateFromError() {
		return null;
	}

	render() {
		return this.props.children;
	}
}
