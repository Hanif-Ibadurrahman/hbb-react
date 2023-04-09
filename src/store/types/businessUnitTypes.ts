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
	page_size?: number;
	name?: string;
}

export interface ICreateBusinessUnitRequest {
	name: string;
}

export interface IUpdateBusinessUnitRequest {
	name: string;
}

export interface IBusinessUnitGetAllResponse {
	status: string;
	message: string;
	data: IBusinessUnitPaginateResponse | null;
}

export interface IBusinessUnitInterfaceState {
	countryList: IBusinessUnit[] | [];
	title: string;
}

export type BusinessUnitContainerState = IBusinessUnitInterfaceState;
