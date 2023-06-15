import moment from "moment";

export const now = moment();
export const currentYear = now.year();

export const changeDateFormat = value => {
	return value ? value.format("YYYY-MM-DD") : undefined;
};
