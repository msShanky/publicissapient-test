import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import initialState from '../store/initialState';
import axios, { AxiosResponse } from 'axios';

export const getFrontPageNews = createAsyncThunk(
	'news/fetchFrontPage',
	async (pageCount: number = 0) => {
		const { data }: AxiosResponse<FrontPageNews> = await axios.get(
			`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
		);
		const updatedNewsWithAdditionalFlags = data.hits.map((news) => {
			return { ...news, isHidden: false };
		});
		return { ...data, hits: updatedNewsWithAdditionalFlags };
	}
);

const newsSlice = createSlice({
	name: 'news',
	initialState: initialState.news,
	reducers: {
		// TODO: Change this to an async thunk to call a service for increasing the upvote
		upVote: (state, { payload }) => {
			// The the index of the news to be updated
			const indexOfRecordToUpdate = state.data.findIndex((news) => news.objectID === payload);
			// if the index could not be found return without any action
			if (indexOfRecordToUpdate < 0) {
				return;
			}
			state.data[indexOfRecordToUpdate].points++;
			return state;
		},
		hide: (state, { payload }) => {
			// The the index of the news to be hidden
			const indexOfRecordToHide = state.data.findIndex((news) => news.objectID === payload);
			// if the index could not be found return without any action
			if (indexOfRecordToHide < 0) {
				return;
			}
			state.data[indexOfRecordToHide].isHidden = true;
			return state;
		},
		setPageNumber: (state, { payload }) => {
			state.pageNumber = payload;
		},
	},
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

const { reducer, actions } = newsSlice;
export const { upVote, hide, setPageNumber } = actions;

export default reducer;
