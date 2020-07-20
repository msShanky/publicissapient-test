import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface NewsItemStyleProps {
	textAlign?: 'center' | 'left';
}

interface NewsItemPros {
	news: NewsHit;
}

const NewsTitle = styled.span`
	font-weight: bold;
	font-size: 14px;
`;

const NewsAuthor = styled.span`
	font-size: 12px;
	font-weight: lighter;
`;

const NewsItemRow = styled.tr`
	height: 35px;
	:nth-of-type(2n) {
		background-color: ${({ theme }) => theme.colors?.darkSecondary};
	}
`;

const NewsItemStyle = styled.td<NewsItemStyleProps>`
	text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
	align-items: center;
`;

const NewsTimeStyle = styled.span`
	padding-left: 5px;
`;

const NewsHideWrapper = styled.span`
	padding-left: 5px;
`;

const DefaultButton = styled.button`
	border: none;
	::focus ::active {
		border: ${({ theme }) => `${theme.colors.main} solid 0.5px`};
	}
	background: none;
	:hover {
		cursor: pointer;
	}
`;

const NewsItem: FunctionComponent<NewsItemPros> = ({ news }) => {
	const currentTime = new Date().getTime();
	const newsTime = new Date(news.created_at).getTime();
	let diff = (newsTime - currentTime) / 1000;
	diff /= 60 * 60;
	diff = Math.abs(Math.round(diff));

	return (
		<NewsItemRow>
			<NewsItemStyle>{news.num_comments}</NewsItemStyle>
			<NewsItemStyle>{news.points}</NewsItemStyle>
			<NewsItemStyle>
				<DefaultButton>
					<i className='fas fa-sort-up'></i>
				</DefaultButton>
			</NewsItemStyle>
			<NewsItemStyle textAlign='left'>
				<NewsTitle>{news.title}</NewsTitle> by <NewsAuthor>{news.author}</NewsAuthor>
				<NewsTimeStyle>
					{diff} {diff <= 1 ? 'hour' : 'hours'} ago
				</NewsTimeStyle>
				<NewsHideWrapper>
					[<DefaultButton>hide</DefaultButton>]
				</NewsHideWrapper>
			</NewsItemStyle>
		</NewsItemRow>
	);
};

export default NewsItem;
