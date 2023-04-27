import { PaginationState } from "./paginationTypes";

export interface IBusinessUnit {
	id: string;
	name: string | null;
	id_company?: string | null;
}

export interface IBusinessUnitPaginateResponse extends PaginationState {
	data: IBusinessUnit[];
}

export interface IBusinessUnitGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	company?: string;
}

export interface ICreateBusinessUnitRequest {
	name: string;
	id_company: string;
}

export interface IUpdateBusinessUnitRequest {
	name: string;
	id_company: string;
}

export interface IBusinessUnitGetAllResponse {
	status: string;
	message: string;
	data: IBusinessUnitPaginateResponse | null;
}

export interface IBusinessUnitInterfaceState {
	getAllBusinessUnitWithPagination: IBusinessUnitPaginateResponse | null;
	title: string;
}

export type BusinessUnitContainerState = IBusinessUnitInterfaceState;
