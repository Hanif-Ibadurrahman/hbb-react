import { PaginationState } from "./paginationTypes";

export interface IServiceReplacement {
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

export interface IServiceReplacementPaginateResponse extends PaginationState {
	data: IServiceReplacement[];
}

export interface IServiceReplacementGetAllParams {
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

export interface ICreateServiceReplacementRequest {
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

export interface IUpdateServiceReplacementRequest {
	inventory_code: string;
	spesification: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
	_method: string;
}

export interface IServiceReplacementGetAllResponse {
	status: string;
	message: string;
	data: IServiceReplacementPaginateResponse | null;
}

export interface IServiceReplacementInterfaceState {
	getAllServiceReplacementWithPagination: IServiceReplacementPaginateResponse | null;
	title: string;
}

export type ServiceReplacementContainerState =
	IServiceReplacementInterfaceState;
