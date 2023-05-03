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

export const getDetailProviderApi = (id: number) => {
	return apiWithToken.get(`/api/master/penyedia/${id}`);
};

export const createNewProviderApi = (input: ICreateProviderRequest) => {
	return apiWithToken.post(`/api/master/penyedia`, input);
};

export const updateProviderApi = (
	id: number,
	input: IUpdateProviderRequest,
) => {
	return apiWithToken.put(`/api/master/penyedia/${id}`, input);
};

export const deleteProviderApi = (id: number) => {
	return apiWithToken.delete(`/api/master/penyedia/${id}`);
};
