import { PaginationState } from "./paginationTypes";

export interface IServiceChange {
	id: number;
	inventory_code: string | null;
	description: string | null;
	attachment_file: string | null;
	emp_name: string | null;
	condition: string | null;
	id_company: string | null;
	id_approval: string | null;
	created_by: string | null;
	status: string | null;
	spesification: string | null;
	id_inventory: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	transaction_uuid: string | null;
	company_name: string | null;
	inventory_name: string | null;
	pending_status: string | null;
	current_flow: number | null;
	current_approver: number | null;
	reject_status: string | null;
	is_closed_by: string | null;
}

export interface IServiceChangePaginateResponse extends PaginationState {
	data: IServiceChange[];
}

export interface IServiceChangeGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
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
	id_company: number;
	id_workflow: number;
	created_by: number;
	files: any | null;
}

export interface IUpdateServiceChangeRequest {
	inventory_code: string;
	spesification: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: number;
	id_workflow: number;
	created_by: number;
	files: any | null;
	_method: string;
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
