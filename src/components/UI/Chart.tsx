import React, { FunctionComponent } from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis } from 'recharts';

interface ChartProps {
	data: NewsHit[];
}

const Chart: FunctionComponent<ChartProps> = ({ data }) => {
	const dataForCharts = data.filter((news) => !news.isHidden);
	return (
		<div>
			<LineChart width={700} height={550} data={dataForCharts}>
				<XAxis dataKey='objectID' />
				<YAxis dataKey='points' />
				<Tooltip />
				<CartesianGrid stroke='#f5f5f5' />
				<Line type='monotone' dataKey='points' stroke='#ff7300' yAxisId={0} />
			</LineChart>
		</div>
	);
};

export default Chart;
