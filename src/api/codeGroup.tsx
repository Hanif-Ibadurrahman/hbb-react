import {
	ICodeGroupGetAllParams,
	ICreateCodeGroupRequest,
	IUpdateCodeGroupRequest,
} from "store/types/codeGroupTypes";
import { apiWithToken } from ".";

export const getAllCodeGroupApi = (params?: ICodeGroupGetAllParams) => {
	return apiWithToken.get(`/api/master/main-group`, {
		params: params,
	});
};

export const getDetailCodeGroupApi = (id: number) => {
	return apiWithToken.get(`/api/master/main-group/${id}`);
};

export const createNewCodeGroupApi = (input: ICreateCodeGroupRequest) => {
	return apiWithToken.post(`/api/master/main-group`, input);
};

export const updateCodeGroupApi = (
	id: number,
	input: IUpdateCodeGroupRequest,
) => {
	return apiWithToken.put(`/api/master/main-group/${id}`, input);
};

export const deleteCodeGroupApi = (id: number) => {
	return apiWithToken.delete(`/api/master/main-group/${id}`);
};
