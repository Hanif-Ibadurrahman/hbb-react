import { PaginationState } from "./paginationTypes";

export interface ICompany {
	id: string;
	name: string | null;
	code: string | null;
}

export interface ICompanyPaginateResponse extends PaginationState {
	data: ICompany[];
}

export interface ICompanyGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	code?: string;
}

export interface ICreateCompanyRequest {
	name: string;
	code: string;
}

export interface IUpdateCompanyRequest {
	name: string;
	code: string;
}

export interface ICompanyGetAllResponse {
	status: string;
	message: string;
	data: ICompanyPaginateResponse | null;
}

export interface ICompanyInterfaceState {
	getAllPaginationWithPagination: ICompanyPaginateResponse | null;
	title: string;
}

export type CompanyContainerState = ICompanyInterfaceState;
