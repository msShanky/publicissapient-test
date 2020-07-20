import { configureStore, getDefaultMiddleware, EnhancedStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers';

const logger = createLogger({
	collapsed: true,
	duration: true,
	timestamp: true,
	level: 'log',
	logErrors: true, // should the logger catch, log, and re-throw errors?
});

function initializeStore(): EnhancedStore {
	const middleware = [...getDefaultMiddleware()];
	if (process.env.NODE_ENV !== 'production') {
		middleware.push(logger);
	}

	return configureStore({
		reducer: rootReducer,
		middleware,
	});
}

export const store = initializeStore();
