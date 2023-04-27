import { PaginationState } from "./paginationTypes";

export interface IServiceChange {
	id: string;
	name_item: string | null;
	description: string | null;
	photo: string | null;
	user: string | null;
	condition: string | null;
	specification: string | null;
}

export interface IServiceChangePaginateResponse extends PaginationState {
	data: IServiceChange[];
}

export interface IServiceChangeGetAllParams {
	page?: number;
	per_page?: number;
	name_item?: string | null;
	description?: string | null;
}

export interface ICreateServiceChangeRequest {
	inventory_code: string;
	emp_name: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	spesification: string;
	id_company: string;
	created_by: string;
	files: File[];
}

export interface IUpdateServiceChangeRequest {
	inventory_code: string;
	emp_name: string;
	description: string;
	photo: string;
	user: string;
	condition: string;
	spesification: string;
	id_company: string;
	created_by: string;
	files: File[];
}

export interface IServiceChangeGetAllResponse {
	status: string;
	message: string;
	data: IServiceChangePaginateResponse | null;
}

export interface IServiceChangeInterfaceState {
	getAllServiceChangeWithPagination: IServiceChangePaginateResponse | null;
	title: string;
}

export type ServiceChangeContainerState = IServiceChangeInterfaceState;
