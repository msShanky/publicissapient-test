import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface TableHeadStyle {
	readonly width?: number;
	readonly textAlign?: 'left' | 'center';
}

const TableHeadRow = styled.tr`
	height: 30px;
	background-color: rgb(255, 102, 0);
`;

const TableHead = styled.th<TableHeadStyle>`
	width: ${({ width }) => (width ? `${width}%` : '10%')};
	text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
	color: white;
`;

const NewsHead: FunctionComponent = () => {
	return (
		<TableHeadRow>
			<TableHead>Comments</TableHead>
			<TableHead>Vote Count</TableHead>
			<TableHead>Up Vote</TableHead>
			<TableHead width={70} textAlign='left'>
				News Details
			</TableHead>
		</TableHeadRow>
	);
};

export default NewsHead;
