import {
	IEmployeeGetAllParams,
	ICreateEmployeeRequest,
	IUpdateEmployeeRequest,
	IUploadExcelEmployeeRequest,
} from "store/types/employeeTypes";
import { apiWithToken } from ".";

export const getAllEmployeeApi = (params?: IEmployeeGetAllParams) => {
	return apiWithToken.get(`/api/master/employee`, {
		params: params,
	});
};

export const getDetailEmployeeApi = (id: number) => {
	return apiWithToken.get(`/api/master/employee/${id}`);
};

export const createNewEmployeeApi = (input: ICreateEmployeeRequest) => {
	return apiWithToken.post(`/api/master/employee`, input);
};

export const updateEmployeeApi = (
	id: number,
	input: IUpdateEmployeeRequest,
) => {
	return apiWithToken.put(`/api/master/employee/${id}`, input);
};

export const deleteEmployeeApi = (id: number) => {
	return apiWithToken.delete(`/api/master/employee/${id}`);
};

export const uploadExcelEmployeeApi = (input: IUploadExcelEmployeeRequest) => {
	return apiWithToken.post(`/api/master/employee/import-excel`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};
