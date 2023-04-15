import {
	ISubCodeGroupGetAllParams,
	ICreateSubCodeGroupRequest,
	IUpdateSubCodeGroupRequest,
} from "store/types/subCodeGroupTypes";
import { apiWithToken } from ".";

export const getAllSubCodeGroupApi = (
	id: string,
	params?: ISubCodeGroupGetAllParams,
) => {
	return apiWithToken.get(`/api/master/sub-groups/${id}`, {
		params: params,
	});
};

export const getDetailSubCodeGroupApi = (id: string) => {
	return apiWithToken.get(`/api/master/sub-group/${id}`);
};

export const createNewSubCodeGroupApi = (input: ICreateSubCodeGroupRequest) => {
	return apiWithToken.post(`/api/master/sub-group`, input);
};

export const updateSubCodeGroupApi = (
	id: string,
	input: IUpdateSubCodeGroupRequest,
) => {
	return apiWithToken.put(`/api/master/sub-group/${id}`, input);
};

export const deleteSubCodeGroupApi = (id: string) => {
	return apiWithToken.delete(`/api/master/sub-group/${id}`);
};
