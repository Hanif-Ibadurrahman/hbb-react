import {
	IProviderGetAllParams,
	ICreateProviderRequest,
	IUpdateProviderRequest,
} from "store/types/providerTypes";
import { apiWithToken } from ".";

export const getAllProviderApi = (params?: IProviderGetAllParams) => {
	return apiWithToken.get(`/api/master/penyedia`, {
		params: params,
	});
};

export const getDetailProviderApi = (id: string) => {
	return apiWithToken.get(`/api/master/penyedia/${id}`);
};

export const createNewProviderApi = (input: ICreateProviderRequest) => {
	return apiWithToken.post(`/api/master/penyedia`, input);
};

export const updateProviderApi = (
	id: string,
	input: IUpdateProviderRequest,
) => {
	return apiWithToken.put(`/api/master/penyedia/${id}`, input);
};
