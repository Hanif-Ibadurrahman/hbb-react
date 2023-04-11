import {
	ICountryGetAllParams,
	ICreateCountryRequest,
	IUpdateCountryRequest,
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
export const getDetailCountryApi = (id: string) => {
	return apiWithToken.get(`/api/master/country/${id}`);
};

export const updateCountryApi = (id: string, input: IUpdateCountryRequest) => {
	return apiWithToken.put(`/api/master/country/${id}`, input);
};

export const deleteCountryApi = (id: string) => {
	return apiWithToken.delete(`/api/master/country/${id}`);
};
