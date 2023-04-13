import {
	ICompanyGetAllParams,
	ICreateCompanyRequest,
	IUpdateCompanyRequest,
} from "store/types/companyTypes";
import { apiWithToken } from ".";

export const getAllCompanyApi = (params?: ICompanyGetAllParams) => {
	return apiWithToken.get(`/api/master/company`, {
		params: params,
	});
};

export const getDetailCompanyApi = (id: string) => {
	return apiWithToken.get(`/api/master/company/${id}`);
};

export const createNewCompanyApi = (input: ICreateCompanyRequest) => {
	return apiWithToken.post(`/api/master/company`, input);
};

export const updateCompanyApi = (id: string, input: IUpdateCompanyRequest) => {
	return apiWithToken.put(`/api/master/company/${id}`, input);
};

export const deleteCompanyApi = (id: string) => {
	return apiWithToken.delete(`/api/master/company/${id}`);
};
