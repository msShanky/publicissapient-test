import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ReactComponent as UpVoteIcon } from '../../images/up_icon.svg';

interface NewsItemStyleProps {
	textAlign?: 'center' | 'left';
}

interface NewsItemProps {
	news: NewsHit;
	upVote(id: string): void;
	hideNews(id: string): void;
}

interface ButtonStyleProps {
	width?: string;
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

const DefaultButton = styled.button<ButtonStyleProps>`
	width: ${({ width }) => (width ? width : 'auto')};
`;

const NewsItem: FunctionComponent<NewsItemProps> = ({ news, upVote, hideNews }) => {
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
				<DefaultButton width={'25%'} onClick={() => upVote(news.objectID)}>
					{/* <i className='fas fa-sort-up'></i> */}
					<UpVoteIcon />
				</DefaultButton>
			</NewsItemStyle>
			<NewsItemStyle textAlign='left'>
				<NewsTitle>{news.title}</NewsTitle> by <NewsAuthor>{news.author}</NewsAuthor>
				<NewsTimeStyle>
					{diff} {diff <= 1 ? 'hour' : 'hours'} ago
				</NewsTimeStyle>
				<NewsHideWrapper>
					[<DefaultButton onClick={() => hideNews(news.objectID)}>hide</DefaultButton>]
				</NewsHideWrapper>
			</NewsItemStyle>
		</NewsItemRow>
	);
};

export default NewsItem;
