import React from 'react';
import './statisticsTable.css';
import { StatisticsData } from '../types/winesRelated';

type StatisticsTableProps = {
	data: StatisticsData;
	statisticKey: string;
};

const StatisticsTable: React.FC<StatisticsTableProps> = ({
	data,
	statisticKey,
}) => {
	const measures = ['Mean', 'Median', 'Mode'];
	const getValueFor = getValueBydMeasure(data);
	return (
		<div className='table-container'>
			<table className='data-table'>
				<thead>
					<tr>
						<th>Measure</th>
						{Object.keys(data).map(className => (
							<th key={className}>{`Class ${className}`}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{measures.map(measure => (
						<TableRow
							key={measure}
							label={`${statisticKey} ${measure}`}
							values={getValueFor(measure)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StatisticsTable;

// Util components
const TableRow: React.FC<{ label: string; values: (string | number)[] }> = ({
	label,
	values,
}) => (
	<tr>
		<td>{label}</td>
		{values.map((value, index) => (
			<td key={index}>{value}</td>
		))}
	</tr>
);

// Util functions

/**
 * Returns a function that retrieves statistical values for a given measure name from a StatisticsData object.
 *
 * @param {StatisticsData} data - The StatisticsData object containing the statistical values.
 * @returns {Function} A function that takes a measure name ('Mean', 'Median', or 'Mode') and returns an array of corresponding values.
 */
function getValueBydMeasure(data: StatisticsData) {
	return (measureName: string) => {
		return Object.keys(data)
			.map(Number)
			.map(className => {
				if (measureName === 'Mean') {
					return data[className].mean.toFixed(3);
				} else if (measureName === 'Median') {
					return data[className].median.toFixed(3);
				} else if (measureName === 'Mode') {
					const mode = data[className].mode;
					return mode === null ? 'No Mode' : mode.toFixed(3);
				}
				return '';
			});
	};
}
