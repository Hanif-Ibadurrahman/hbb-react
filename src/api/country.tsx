import {
	ICountryGetAllParams,
	ICreateCountryRequest,
} from "store/types/countryTypes";
import { apiWithToken } from "./dox";

export const getAllCountryApi = (params?: ICountryGetAllParams) => {
	return apiWithToken.get(`/api/master/country`, {
		params: params,
	});
};

export const createNewCountryApi = (input: ICreateCountryRequest) => {
	return apiWithToken.post(`/api/master/country`, input);
};
