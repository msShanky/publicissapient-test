import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import initialState from '../store/initialState';
import axios, { AxiosResponse } from 'axios';

export const getFrontPageNews = createAsyncThunk(
	'news/fetchFrontPage',
	async (pageCount: number = 1) => {
		const { data }: AxiosResponse<FrontPageNews> = await axios.get(
			// `http://hn.algolia.com/api/v1/search?tags=front_page&page=${pageCount}`
			`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
		);
		// console.log('DATA RECEIVED FROM THE NEW API', data.hits);
		return data;
	}
);

const newsSlice = createSlice({
	name: 'news',
	initialState: initialState.news,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFrontPageNews.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(getFrontPageNews.fulfilled, (state, { payload }) => {
			state.isFetching = false;
			state.data = payload.hits;
		});
		builder.addCase(getFrontPageNews.rejected, (state) => {
			state.data = [];
			state.isError = true;
			state.isFetching = false;
		});
	},
});

const { reducer } = newsSlice;
// export const { getFrontPageNews } = actions;

export default reducer;
