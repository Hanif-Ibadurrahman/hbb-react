import { PaginationState } from "./paginationTypes";

export interface IServiceInspection {
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
	current_approver: number | null;
	reject_status: string | null;
	is_closed_by: string | null;
}

export interface IServiceInspectionPaginateResponse extends PaginationState {
	data: IServiceInspection[];
}

export interface IServiceInspectionGetAllParams {
	page?: number;
	per_page?: number;
	inventory_code?: string;
	description?: string;
	condition?: string;
	emp_name?: string;
	spesification?: string;
}

export interface ICreateServiceInspectionRequest {
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

export interface IUpdateServiceInspectionRequest {
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

export interface IServiceInspectionGetAllResponse {
	status: string;
	message: string;
	data: IServiceInspectionPaginateResponse | null;
}

export interface IServiceInspectionInterfaceState {
	getAllServiceInspectionWithPagination: IServiceInspectionPaginateResponse | null;
	title: string;
}

export type ServiceInspectionContainerState = IServiceInspectionInterfaceState;
