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
	id_inventory: number | null;
	transaction_uuid: string | null;
	no_urut: number | null;
	inventory_return: string | null;
	id_inventory_return: number | null;
	id_inventory_obtained: number | null;
	status_form_approval: boolean | null;
	id_final_location: number | null;
	id_final_location_return: number | null;
	company_name: string | null;
	inventory_name: string | null;
	inventory_obtained_code: string | null;
	total_flow: number | null;
	pending_status: string | null;
	current_flow: number | null;
	current_approver: number | null;
	reject_status: string | null;
	is_closed_by: string | null;
}

export interface IServiceReplacementDetail extends IServiceReplacement {
	id_workflow: number | null;
	inventory_return_code: string | null;
	inventory_return_name: string | null;
	inventory_return_location: string | null;
	inventory_return_area: string | null;
	inventory_obtained_name: string | null;
	inventory_obtained_location: string | null;
	inventory_obtained_area: string | null;
}

export interface IServiceReplacementApproveForm {
	id: number;
	no_urut: number;
	inventory_name: string;
	inventory_code: string;
	id_inventory_obtained: number;
	description: string;
	condition: string;
	emp_name: string;
	id_final_location: number;
	inventory_return_location: string;
	id_final_location_return: number;
	remark: string;

	//only for filter location
	id_final_satker?: number;
}

export interface IServiceReplacementApproveRequest {
	id_inventory_obtained?: number | null;
	id_final_location_return?: number;
	remark: string;
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
	inventory_return?: string;
	description?: string;
	condition?: string;
	emp_name?: string;
	spesification?: string;
}

export interface ICreateServiceReplacementRequest {
	inventory_code: string;
	inventory_return: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: number;
	id_workflow: number;
	id_final_location: number;
	created_by: number;
	files: any | null;

	area: string;
	location: string;
}

export interface IUpdateServiceReplacementRequest {
	inventory_code: string;
	inventory_return: string;
	description: string;
	condition: string;
	emp_name: string;
	id_company: number;
	id_workflow: number;
	id_final_location: number;
	created_by: number;
	files: any | null;
	_method: string;

	area: string;
	location: string;
}

export interface IUpdateFormApprovalRequest {
	id_inventory_obtained: number | null;
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
