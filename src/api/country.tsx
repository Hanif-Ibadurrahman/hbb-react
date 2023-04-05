import { ICountryGetAllParams } from "store/types/countryTypes";
import { apiWithToken } from "./dox";

export const getAllCountryApi = (params: ICountryGetAllParams) => {
	return apiWithToken.get(`/api/master/country?`, {
		params: params,
	});
};
