import {
	IManagerGetAllParams,
	ICreateManagerRequest,
	IUpdateManagerRequest,
} from "store/types/managerTypes";
import { apiWithToken } from ".";

export const getAllManagerApi = (params?: IManagerGetAllParams) => {
	return apiWithToken.get(`/api/master/pengelola`, {
		params: params,
	});
};

export const getDetailManagerApi = (id: number) => {
	return apiWithToken.get(`/api/master/pengelola/${id}`);
};

export const createNewManagerApi = (input: ICreateManagerRequest) => {
	return apiWithToken.post(`/api/master/pengelola`, input);
};

export const updateManagerApi = (id: number, input: IUpdateManagerRequest) => {
	return apiWithToken.put(`/api/master/pengelola/${id}`, input);
};

export const deleteManagerApi = (id: number) => {
	return apiWithToken.delete(`/api/master/pengelola/${id}`);
};
