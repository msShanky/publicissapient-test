import React, { useEffect, ReactElement } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getFrontPageNews, upVote, hide, setPageNumber } from '../../reducers/news';
import { RootState } from '../../reducers';

import { Chart, Pagination, DataTable, Error } from '../UI';

const CenteredDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 80%;
	margin: auto;
`;

const SpinnerWrapper = styled.div`
	text-align: center;
	margin-top: 20%;
`;

const LandingPage = () => {
	const dispatch = useDispatch();
	const { data, pageNumber, isFetching, isError }: NewsState = useSelector(
		(state: RootState) => state.news
	);

	useEffect(() => {
		if (data.length <= 0) {
			dispatch(getFrontPageNews());
		}
	}, [dispatch, data]);

	const upVoteNews = (id: string): void => {
		dispatch(upVote(id));
	};

	const hideNews = (id: string): void => {
		dispatch(hide(id));
	};

	const getNews = (type: NewsFetchType): void => {
		let pageToBeFetched = pageNumber;
		if (type === 'prev') {
			pageToBeFetched--;
			pageToBeFetched = pageToBeFetched < 0 ? 1 : pageToBeFetched;
		} else {
			pageToBeFetched++;
		}
		dispatch(getFrontPageNews(pageToBeFetched));
		dispatch(setPageNumber(pageToBeFetched));
	};

	const LoaderComponent = (): ReactElement => {
		if (isFetching) {
			return (
				<SpinnerWrapper>
					<Loader type='TailSpin' />
				</SpinnerWrapper>
			);
		}
		if (!isFetching && isError) {
			return <Error />;
		}
		return (
			<CenteredDiv className='App'>
				<DataTable news={data} upVoteNews={upVoteNews} hideNews={hideNews} />
				<Pagination pageNumber={pageNumber} getNews={getNews} />
				<Chart data={data} />
			</CenteredDiv>
		);
	};

	return <LoaderComponent />;
};

export default React.memo(LandingPage);
