import { configureStore, getDefaultMiddleware, EnhancedStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer } from '../reducers';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const logger = createLogger({
	collapsed: true,
	duration: true,
	timestamp: true,
	level: 'log',
	logErrors: true, // should the logger catch, log, and re-throw errors?
});

const persistConfig = {
	key: 'sapient-test',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function initializeStore(): EnhancedStore {
	const middleware = [...getDefaultMiddleware()];
	if (process.env.NODE_ENV !== 'production') {
		middleware.push(logger);
	}

	return configureStore({
		reducer: persistedReducer,
		middleware,
	});
}

export const store = initializeStore();
export const persistor = persistStore(store);
