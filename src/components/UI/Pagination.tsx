import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface PaginationProps {
	pageNumber: number;
	getNews(type: NewsFetchType): void;
}

const PaginationWrapper = styled.div`
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

const Pagination: FunctionComponent<PaginationProps> = ({ pageNumber, getNews }) => {
	return (
		<PaginationWrapper>
			<p>Current Page : {pageNumber} </p>
			<NavigationWrapper>
				<NavigationButton onClick={() => getNews('prev')}>Previous</NavigationButton>
				<span>|</span>
				<NavigationButton onClick={() => getNews('next')}>Next</NavigationButton>
			</NavigationWrapper>
		</PaginationWrapper>
	);
};

export default Pagination;
