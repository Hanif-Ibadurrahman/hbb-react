import {
	IEmployeeGetAllParams,
	ICreateEmployeeRequest,
	IUpdateEmployeeRequest,
} from "store/types/employeeTypes";
import { apiWithToken } from "./dox";

export const getAllEmployeeApi = (params?: IEmployeeGetAllParams) => {
	return apiWithToken.get(`/api/master/employee`, {
		params: params,
	});
};

export const getDetailEmployeeApi = (id: string) => {
	return apiWithToken.get(`/api/master/employee/${id}`);
};

export const createNewEmployeeApi = (input: ICreateEmployeeRequest) => {
	return apiWithToken.post(`/api/master/employee`, input);
};

export const updateEmployeeApi = (
	id: string,
	input: IUpdateEmployeeRequest,
) => {
	return apiWithToken.put(`/api/master/employee/${id}`, input);
};
