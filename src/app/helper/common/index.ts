export const generateRandomHex = (length: number): string => {
	const chars = "0123456789abcdef";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars[randomIndex];
	}
	return result;
};
