import { PaginationState } from "./paginationTypes";
export interface IServiceReturn {
	id: number;
	inventory_code: string | null;
	description: string | null;
	attachment_file: string | null;
	emp_name: string | null;
	condition: string | null;
	id_company: number | null;
	id_approval: number | null;
	created_by: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	status: number | null;
	id_inventory: number | null;
	transaction_uuid: string | null;
	company_name: string | null;
	inventory_name: string | null;
	pending_status: string | null;
	current_flow: number | null;
	current_approver: number | null;
	reject_status: string | null;
	is_closed_by: string | null;

	//not yet added
	transaction_no: string | null;
}

export interface IServiceReturnPaginateResponse extends PaginationState {
	data: IServiceReturn[];
}

export interface IServiceReturnGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
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
	id_company: number;
	id_workflow: number;
	created_by: number;
	files: any | null;
}

export interface IUpdateServiceReturnRequest {
	inventory_code: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: number;
	id_workflow: number;
	created_by: number;
	files: any | null;
	_method: string;
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
