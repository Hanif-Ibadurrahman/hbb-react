import {
	ISubCodeGroupGetAllParams,
	ICreateSubCodeGroupRequest,
	IUpdateSubCodeGroupRequest,
} from "store/types/subCodeGroupTypes";
import { apiWithToken } from ".";

export const getAllSubCodeGroupApi = (
	id: number,
	params?: ISubCodeGroupGetAllParams,
) => {
	return apiWithToken.get(`/api/master/sub-groups/${id}`, {
		params: params,
	});
};

export const getDetailSubCodeGroupApi = (id: number) => {
	return apiWithToken.get(`/api/master/sub-group/${id}`);
};

export const createNewSubCodeGroupApi = (input: ICreateSubCodeGroupRequest) => {
	return apiWithToken.post(`/api/master/sub-group`, input);
};

export const updateSubCodeGroupApi = (
	id: number,
	input: IUpdateSubCodeGroupRequest,
) => {
	return apiWithToken.put(`/api/master/sub-group/${id}`, input);
};

export const deleteSubCodeGroupApi = (id: number) => {
	return apiWithToken.delete(`/api/master/sub-group/${id}`);
};
