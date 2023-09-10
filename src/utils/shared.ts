export function delayForGivenTime(time: number): Promise<number> {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res(time);
		}, time);
	});
}

export function convertToString(params: unknown): string {
	const typeOfParams = typeof params;
	const primitiveTypes = ['string', 'number', 'boolean'];
	if (primitiveTypes.includes(typeOfParams)) {
		return String(params);
	}
	return '';
}
export function convertToNumber(params: unknown): number {
	const typeOfParams = typeof params;
	const primitiveTypes = ['string', 'number', 'boolean'];
	if (primitiveTypes.includes(typeOfParams)) {
		return Number(params);
	}
	return 0;
}
