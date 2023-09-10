import { convertToNumber, delayForGivenTime } from '../utils/shared';
import winesData from '../data/wine-data.json';
import { WineEntry } from '../features/wine-data-tables/types/winesRelated';

export async function getWinesData(): Promise<Array<WineEntry>> {
	await delayForGivenTime(2000);
	if (Array.isArray(winesData)) {
		return winesData.map(wineData => ({
			alcohol: convertToNumber(wineData?.Alcohol),
			malicAcid: convertToNumber(wineData?.['Malic Acid']),
			ash: convertToNumber(wineData?.Ash),
			alcalinityOfAsh: convertToNumber(wineData?.['Alcalinity of ash']),
			magnesium: convertToNumber(wineData?.Magnesium),
			totalPhenols: convertToNumber(wineData?.['Total phenols']),
			flavanoids: convertToNumber(wineData?.Flavanoids),
			nonflavanoidPhenols: convertToNumber(
				wineData?.['Nonflavanoid phenols'],
			),
			proanthocyanins: convertToNumber(wineData?.Proanthocyanins),
			colorIntensity: convertToNumber(wineData?.['Color intensity']),
			hue: convertToNumber(wineData?.Hue),
			proteinContent: convertToNumber(
				wineData?.['OD280/OD315 of diluted wines'],
			),
			unknown: convertToNumber(wineData?.Unknown),
		}));
	}
	return [];
}
