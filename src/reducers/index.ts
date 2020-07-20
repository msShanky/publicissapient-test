import { combineReducers } from '@reduxjs/toolkit';

import news from './news';

export const rootReducer = combineReducers({
	news,
});

export type RootState = ReturnType<typeof rootReducer>;
