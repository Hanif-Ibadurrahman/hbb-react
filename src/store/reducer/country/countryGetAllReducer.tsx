import {
	PROCESS_FAILED,
	SET_COUNTRY_DATA,
	GET_COUNTRY_LIST,
} from "actions/countryAction";
import { ICountryGetAllReducer } from "store/types/countryTypes";

export const initialState: ICountryGetAllReducer = {
	getAllCountryWithPaginate: null,
	title: "Get All Country",
};

export const countryFilterReducer = (
	state = initialState,
	{ type, payload },
): ICountryGetAllReducer => {
	switch (type) {
		case SET_COUNTRY_DATA:
			return {
				...state,
				...payload,
			};
		case GET_COUNTRY_LIST:
			return {
				...state,
				getAllCountryWithPaginate: payload.data.data,
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
