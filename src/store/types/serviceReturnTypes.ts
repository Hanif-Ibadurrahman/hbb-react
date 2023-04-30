import { PaginationState } from "./paginationTypes";

export interface IServiceReturn {
	id: string;
	inventory_code: string | null;
	description: string | null;
	attachment_file: string | null;
	emp_name: string | null;
	condition: string | null;
	id_company: string | null;
	id_approval: string | null;
	created_by: string | null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
	status: string | null;
}

export interface IServiceReturnPaginateResponse extends PaginationState {
	data: IServiceReturn[];
}

export interface IServiceReturnGetAllParams {
	page?: number;
	per_page?: number;
	inventory_code?: string;
	description?: string;
	condition?: string;
	emp_name?: string;
}

export interface ICreateServiceReturnRequest {
	inventory_code: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}

export interface IUpdateServiceReturnRequest {
	inventory_code: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}

export interface IServiceReturnGetAllResponse {
	status: string;
	message: string;
	data: IServiceReturnPaginateResponse | null;
}

export interface IServiceReturnInterfaceState {
	getAllServiceReturnWithPagination: IServiceReturnPaginateResponse | null;
	title: string;
}

export type ServiceReturnContainerState = IServiceReturnInterfaceState;
