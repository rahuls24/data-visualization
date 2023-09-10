export type WineEntry = {
	alcohol: number;
	malicAcid: number;
	ash: number;
	alcalinityOfAsh: number;
	magnesium: number;
	totalPhenols: number;
	flavanoids: number;
	nonflavanoidPhenols: number;
	proanthocyanins: number;
	colorIntensity: number;
	hue: number;
	proteinContent: number;
	unknown: number;
};
export type StatisticsData = {
	[key: number]: {
		mean: number;
		median: number;
		mode: number | null;
	};
};
