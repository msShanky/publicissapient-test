import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import NewsHead from '../UI/NewsHead';
import NewsItem from '../UI/NewsItem';

interface DataTableProps {
	news: NewsHit[];
	upVoteNews(id: string): void;
	hideNews(id: string): void;
}

const DataTableStyles = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 2%;
`;

const DataTable: FunctionComponent<DataTableProps> = ({ news, upVoteNews, hideNews }) => {
	return (
		<DataTableStyles>
			<thead>
				<NewsHead />
			</thead>
			<tbody>
				{news.map(
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
		</DataTableStyles>
	);
};

export default DataTable;
