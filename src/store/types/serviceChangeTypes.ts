import { PaginationState } from "./paginationTypes";

export interface IServiceChange {
	id: number;
	inventory_code: string | null;
	description: string | null;
	attachment_file: string | null;
	emp_name: string | null;
	spesification: string | null;
	status: string | null;
	condition: string | null;
	id_company: string | null;
	id_approval: string | null;
	created_by: string | null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

export interface IServiceChangePaginateResponse extends PaginationState {
	data: IServiceChange[];
}

export interface IServiceChangeGetAllParams {
	page?: number;
	per_page?: number;
	inventory_code?: string;
	description?: string;
	condition?: string;
	emp_name?: string;
	spesification?: string;
}

export interface ICreateServiceChangeRequest {
	inventory_code: string;
	spesification: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}

export interface IUpdateServiceChangeRequest {
	inventory_code: string;
	spesification: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
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
