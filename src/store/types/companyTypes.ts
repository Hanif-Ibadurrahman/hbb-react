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
	page_size?: number;
	nama_pengelola?: string;
	nipg?: string;
}

export interface ICreateCompanyRequest {
	name: string;
}

export interface IUpdateCompanyRequest {
	name: string;
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
