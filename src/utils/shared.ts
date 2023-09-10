/**
 * Delays execution for a given time.
 *
 * @param {number} time - The time to delay in milliseconds.
 * @returns {Promise<number>} A promise that resolves with the provided time.
 */
export function delayForGivenTime(time: number): Promise<number> {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res(time);
		}, time);
	});
}

/**
 * Converts a value to a string.
 *
 * @param {unknown} params - The value to convert.
 * @returns {string} A string representation of the input value.
 */
export function convertToString(params: unknown): string {
	const typeOfParams = typeof params;
	const primitiveTypes = ['string', 'number', 'boolean'];
	if (primitiveTypes.includes(typeOfParams)) {
		return String(params);
	}
	return '';
}

/**
 * Converts a value to a number.
 *
 * @param {unknown} params - The value to convert.
 * @returns {number} A number representation of the input value. If the conversion is not possible, it returns 0.
 */
export function convertToNumber(params: unknown): number {
	const typeOfParams = typeof params;
	const primitiveTypes = ['string', 'number', 'boolean'];
	if (primitiveTypes.includes(typeOfParams)) {
		return Number(params);
	}
	return 0;
}
