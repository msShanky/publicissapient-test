import React, { useEffect } from 'react';
import styled from 'styled-components';
import NewsHead from '../UI/NewsHead';
import NewsItem from '../UI/NewsItem';
import { useDispatch, useSelector } from 'react-redux';
import { getFrontPageNews, upVote, hide, setPageNumber } from '../../reducers/news';
import { RootState } from '../../reducers';

const CenteredDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 80%;
	margin: auto;
`;

const DataTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 2%;
`;

const RightDockedNavigation = styled.div`
	align-self: flex-end;
	width: 18%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const NavigationWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	color: ${({ theme }) => theme.colors.main};
	align-items: flex-end;
`;

const NavigationButton = styled.button`
	color: ${({ theme }) => theme.colors.main};
	font-weight: bold;
`;

const LandingPage = () => {
	const dispatch = useDispatch();
	const { data, pageNumber }: NewsState = useSelector((state: RootState) => state.news);

	useEffect(() => {
		dispatch(getFrontPageNews());
	}, [dispatch]);

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

	return (
		<CenteredDiv className='App'>
			<DataTable>
				<thead>
					<NewsHead />
				</thead>
				<tbody>
					{data.map(
						(newsItem: NewsHit, index: number) =>
							!newsItem.isHidden && (
								<NewsItem
									key={`NewsItem_${index + 1}`}
									upVote={upVoteNews}
									hideNews={hideNews}
									news={newsItem}
								/>
							)
					)}
				</tbody>
			</DataTable>
			<RightDockedNavigation>
				<p>Current Page : {pageNumber} </p>
				<NavigationWrapper>
					<NavigationButton onClick={() => getNews('prev')}>Previous</NavigationButton>
					<span>|</span>
					<NavigationButton onClick={() => getNews('next')}>Next</NavigationButton>
				</NavigationWrapper>
			</RightDockedNavigation>
		</CenteredDiv>
	);
};

export default React.memo(LandingPage);
