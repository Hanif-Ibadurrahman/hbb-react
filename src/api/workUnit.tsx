import {
	IWorkUnitGetAllParams,
	ICreateWorkUnitRequest,
	IUpdateWorkUnitRequest,
} from "store/types/workUnitTypes";
import { apiWithToken } from ".";

export const getAllWorkUnitApi = (params?: IWorkUnitGetAllParams) => {
	return apiWithToken.get(`/api/master/satuan-kerja`, {
		params: params,
	});
};

export const getDetailWorkUnitApi = (id: number) => {
	return apiWithToken.get(`/api/master/satuan-kerja/${id}`);
};

export const createNewWorkUnitApi = (input: ICreateWorkUnitRequest) => {
	return apiWithToken.post(`/api/master/satuan-kerja`, input);
};

export const updateWorkUnitApi = (
	id: number,
	input: IUpdateWorkUnitRequest,
) => {
	return apiWithToken.put(`/api/master/satuan-kerja/${id}`, input);
};

export const deleteWorkUnitApi = (id: number) => {
	return apiWithToken.delete(`/api/master/satuan-kerja/${id}`);
};
