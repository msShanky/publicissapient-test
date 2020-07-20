import React, { useEffect } from 'react';
import styled from 'styled-components';
import NewsHead from '../UI/NewsHead';
import NewsItem from '../UI/NewsItem';
import { useDispatch, useSelector } from 'react-redux';
import { getFrontPageNews } from '../../reducers/news';
import { RootState } from '../../reducers';

const CenteredDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const DataTable = styled.table`
	width: 80%;
	border-collapse: collapse;
	margin-top: 2%;
`;

const LandingPage = () => {
	const dispatch = useDispatch();
	const { data }: NewsState = useSelector((state: RootState) => state.news);

	useEffect(() => {
		dispatch(getFrontPageNews());
	}, [dispatch]);

	return (
		<CenteredDiv className='App'>
			<DataTable>
				<thead>
					<NewsHead />
				</thead>
				<tbody>
					{data.map((newsItem: NewsHit, index: number) => (
						<NewsItem key={`NewsItem_${index + 1}`} news={newsItem} />
					))}
				</tbody>
			</DataTable>
		</CenteredDiv>
	);
};

export default React.memo(LandingPage);
