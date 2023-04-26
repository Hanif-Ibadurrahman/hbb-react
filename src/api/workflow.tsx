import {
	IWorkflowGetAllParams,
	ICreateWorkflowRequest,
	IUpdateWorkflowRequest,
} from "store/types/workflowTypes";
import { apiWithToken } from ".";

export const getAllWorkflowApi = (params?: IWorkflowGetAllParams) => {
	return apiWithToken.get(`/api/master/workflow`, {
		params: params,
	});
};

export const createNewWorkflowApi = (input: ICreateWorkflowRequest) => {
	return apiWithToken.post(`/api/master/workflow`, input);
};

export const getDetailWorkflowApi = (id: string) => {
	return apiWithToken.get(`/api/master/workflow/${id}`);
};

export const updateWorkflowApi = (
	id: string,
	input: IUpdateWorkflowRequest,
) => {
	return apiWithToken.put(`/api/master/workflow/${id}`, input);
};

export const deleteWorkflowApi = (id: string) => {
	return apiWithToken.delete(`/api/master/workflow/${id}`);
};
