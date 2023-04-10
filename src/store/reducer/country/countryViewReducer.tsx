import {
	PROCESS_FAILED,
	SET_COUNTRY_DATA,
	GET_COUNTRY_LIST,
} from "actions/countryAction";
import { ICountryViewReducer } from "store/types/countryTypes";

export const initialState: ICountryViewReducer = {
	getCountry: null,
	title: "Get Detail Country",
};

export const countryViewReducer = (
	state = initialState,
	{ type, payload },
): ICountryViewReducer => {
	switch (type) {
		case SET_COUNTRY_DATA:
			return {
				...state,
				...payload,
			};
		case GET_COUNTRY_LIST:
			return {
				...state,
				getCountry: payload.data.data,
			};
		case PROCESS_FAILED:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};
