import React, { useEffect, useMemo, useState } from 'react';
import StatisticsTable from './components/StatisticsTable';
import { StatisticsData, WineEntry } from './types/winesRelated';
import { getWinesData } from '../../services/wineReleted';
import { calculateStatisticsByClass } from './utils/wineRelatedCalculation';
import './wineDataTableView.css';
function WineDataTableView() {
	const [dataSet, setDataSet] = useState<Array<WineEntry>>([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		async function fetchDataSet() {
			setIsLoading(true);
			const dataSet = await getWinesData();
			setDataSet(dataSet);
			setIsLoading(false);
		}
		fetchDataSet();
	}, []);

	const flavanoidsStatisticsData: StatisticsData = useMemo(() => {
		const valueCalculator = (data: WineEntry) => data.flavanoids;
		return calculateStatisticsByClass(dataSet, valueCalculator);
	}, [dataSet]);

	const gammaStatisticsData: StatisticsData = useMemo(() => {
		const valueCalculator = (data: WineEntry) =>
			data.magnesium === 0 ? 0 : (data.ash * data.hue) / data.magnesium;
		return calculateStatisticsByClass(dataSet, valueCalculator);
	}, [dataSet]);

	return (
		<main>
			<section className='section-container'>
				<h1>{'Flavanoids Statistics'}</h1>
				{isLoading && <h4>Loading the data...</h4>}
				{!isLoading && (
					<StatisticsTable
						statisticKey={'Flavanoids'}
						data={flavanoidsStatisticsData}
					/>
				)}
			</section>
			<section className='section-container'>
				<h1>{'Gamma Statistics'}</h1>
				{isLoading && <h4>Loading the data...</h4>}
				{!isLoading && (
					<StatisticsTable
						statisticKey={'Gamma'}
						data={gammaStatisticsData}
					/>
				)}
			</section>
		</main>
	);
}

export default WineDataTableView;
