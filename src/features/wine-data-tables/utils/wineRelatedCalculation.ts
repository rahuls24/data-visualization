import { StatisticsData, WineEntry } from '../types/winesRelated';

/**
 * Normalizes wine data by grouping entries based on their alcohol content.
 *
 * @param {Array<WineEntry>} winesData - The array of wine entries.
 * @returns {Record<number, Array<WineEntry>>} A record where keys are alcohol content and values are corresponding entries.
 */
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

/**
 * Calculates the mean of a given set of numerical data.
 *
 * @param {number[]} data - The array of numerical values.
 * @returns {number} The mean value.
 */
function calculateMean(data: number[]): number {
	const sum = data.reduce((acc, val) => acc + val, 0);
	return sum / data.length;
}

/**
 * Calculates the median of a given set of numerical data.
 *
 * @param {number[]} data - The array of numerical values.
 * @returns {number} The median value.
 */
function calculateMedian(data: number[]): number {
	const sortedData = [...data].sort((a, b) => a - b);
	const mid = Math.floor(sortedData.length / 2);

	if (sortedData.length % 2 === 0) {
		return (sortedData[mid - 1] + sortedData[mid]) / 2;
	} else {
		return sortedData[mid];
	}
}

/**
 * Calculates the mode of a given set of numerical data.
 *
 * @param {number[]} data - The array of numerical values.
 * @returns {number | null} The mode value, or null if there is no mode.
 */
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

/**
 * Calculates statistics for different alcohol classes based on a provided value calculator function.
 *
 * @param {Array<WineEntry>} winesData - The array of wine entries.
 * @param {(data: WineEntry) => number} valueCalculator - A function to calculate a specific value from a WineEntry.
 * @returns {StatisticsData} A record of statistics for different alcohol classes.
 */
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
