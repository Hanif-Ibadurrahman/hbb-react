import {
	PROCESS_FAILED,
	SET_COUNTRY_DATA,
	GET_COUNTRY_LIST,
} from "actions/countryAction";
import { ICountryInterfaceState } from "store/types/countryTypes";

export const initialState: ICountryInterfaceState = {
	countryList: [],
	title: "Country",
};

export const countryFilterReducer = (
	state = initialState,
	{ type, payload },
): ICountryInterfaceState => {
	switch (type) {
		case SET_COUNTRY_DATA:
			return {
				...state,
				...payload,
			};
		case GET_COUNTRY_LIST:
			return {
				...state,
				countryList: payload.data.data.data,
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
