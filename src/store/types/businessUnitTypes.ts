import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";

export interface IBusinessUnit {
	id: number;
	name: string | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	company: ICompany | null;
}

export interface IBusinessUnitPaginateResponse extends PaginationState {
	data: IBusinessUnit[];
}

export interface IBusinessUnitGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	name?: string;
	company?: string;
	id_company?: number;
}

export interface ICreateBusinessUnitRequest {
	name: string;
	id_company: number;
}

export interface IUpdateBusinessUnitRequest {
	name: string;
	id_company: number;
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
