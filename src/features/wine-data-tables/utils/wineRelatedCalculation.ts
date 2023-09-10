import { StatisticsData, WineEntry } from '../types/winesRelated';

function normalizedWinesDataByAlcohol(
	winesData: Array<WineEntry>,
): Record<number, Array<WineEntry>> {
	const normalizeWinesData: Record<number, Array<WineEntry>> = {};
	winesData.forEach(entry => {
		const { alcohol, ...rest } = entry;

		if (normalizeWinesData[alcohol]) {
			normalizeWinesData[alcohol].push({ alcohol, ...rest });
		} else {
			normalizeWinesData[alcohol] = [{ alcohol, ...rest }];
		}
	});
	return normalizeWinesData;
}
function calculateMean(data: number[]): number {
	const sum = data.reduce((acc, val) => acc + val, 0);
	return sum / data.length;
}

// Function to calculate median
function calculateMedian(data: number[]): number {
	const sortedData = [...data].sort((a, b) => a - b);
	const mid = Math.floor(sortedData.length / 2);

	if (sortedData.length % 2 === 0) {
		return (sortedData[mid - 1] + sortedData[mid]) / 2;
	} else {
		return sortedData[mid];
	}
}
// Function to calculate mode
function calculateMode(data: number[]): number | null {
	const counts: Record<number, number> = {};

	data.forEach(value => {
		counts[value] = (counts[value] || 0) + 1;
	});

	let mode: number | null = null;
	let maxCount = 1;

	Object.keys(counts)
		.map(Number)
		.forEach(key => {
			const count = counts[key];
			if (count > maxCount) {
				mode = key;
				maxCount = count;
			}
		});

	return mode;
}
export function calculateStatisticsByClass(
	winesData: Array<WineEntry>,
	valueCalculator: (data: WineEntry) => number,
): StatisticsData {
	const normalizeWinesData = normalizedWinesDataByAlcohol(winesData);
	const statisticsData: StatisticsData = {};
	Object.keys(normalizeWinesData)
		.map(Number)
		.forEach(alcoholClass => {
			const currentClassData = normalizeWinesData[alcoholClass];
			const values = currentClassData.map(valueCalculator);
			statisticsData[alcoholClass] = {
				mean: calculateMean(values),
				median: calculateMedian(values),
				mode: calculateMode(values),
			};
		});
	return statisticsData;
}
