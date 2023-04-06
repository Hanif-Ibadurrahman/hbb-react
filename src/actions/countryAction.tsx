import { createNewCountryApi, getAllCountryApi } from "api/country";
import {
	ICountryGetAllParams,
	ICreateCountryRequest,
} from "store/types/countryTypes";
export const SET_COUNTRY_DATA = "SET_COUNTRY_DATA";
export const SET_COUNTRY_FILTER = "SET_COUNTRY_FILTER";
export const GET_COUNTRY_LIST = "GET_COUNTRY_LIST";
export const CREATE_NEW_COUNTRY = "CREATE_NEW_COUNTRY";
export const PROCESS_FAILED = "PROCESS_FAILED";

export const getCountryListAction = (params: ICountryGetAllParams) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_COUNTRY_DATA,
				payload: params,
			});

			const response = await getAllCountryApi(params);

			dispatch({
				type: GET_COUNTRY_LIST,
				payload: response,
			});

			return response;
		} catch (error: any) {
			dispatch({
				type: PROCESS_FAILED,
				payload: {
					error,
				},
			});
			throw error;
		}
	};
};

export const createNewCountryAction = (input: ICreateCountryRequest) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_COUNTRY_DATA,
				payload: input,
			});

			const response = await createNewCountryApi(input);

			dispatch({
				type: CREATE_NEW_COUNTRY,
				payload: response,
			});

			return response;
		} catch (error: any) {
			dispatch({
				type: PROCESS_FAILED,
				payload: {
					error,
				},
			});
			throw error;
		}
	};
};
