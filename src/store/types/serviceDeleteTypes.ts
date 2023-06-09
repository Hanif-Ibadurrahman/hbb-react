import { PaginationState } from "./paginationTypes";

export interface IServiceDelete {
	id: number;
	id_quest: string | null;
	nipg: string | null;
	id_inventory: string | null;
	date: string | null;
	reason: string | null;
	remark: string | null;
	approve_by: string | null;
	status: number | null;
	check: number | null;
	retire_date: string | null;
	date_start: string | null;
	date_order: string | null;
	date_end: string | null;
	permintaan_layanan: string | null;
	tindak_lanjut: string | null;
	eksekutor: string | null;
	reject: string | null;
	description: string | null;
	approved_date: string | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean | null;
	from_mobile: boolean | null;
	id_company: number | null;
	created_by: number | null;
	id_approval: number | null;
	transaction_uuid: string | null;
	condition: string | null;
	no_urut: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_final_location: number | null;
	company_name: string | null;
	inventory_name: string | null;
	inventory_type: number | null;
	inventory_code: string | null;
	pending_status: string | null;
	current_flow: number | null;
	current_approver: number | null;
	reject_status: string | null;
	is_closed_by: string | null;
}

export interface IServiceDeleteDetail extends IServiceDelete {
	id_workflow: number | null;
	total_flow: number | null;
}

export interface IServiceDeleteApproveForm {
	id: number;
	no_urut: number;
	inventory_name: string;
	inventory_code: string;
	condition: string;
	reason: string;
	id_final_location: number;
	remark: string;

	//only for filter location
	id_final_satker?: number;
}

export interface IServiceDeleteApproveRequest {
	id_final_location?: number;
	remark: string;
}

export interface IServiceDeletePaginateResponse extends PaginationState {
	data: IServiceDelete[];
}

export interface IServiceDeleteGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	inventory_code?: string;
	condition?: string;
	date?: string;
	emp_name?: string;
	remark?: string;
}

export interface ICreateServiceDeleteRequest {
	inventory_type: number;
	id_inventory: number;
	reason: string;
	condition: string;
	id_company: number;
	created_by: number;
	id_workflow: number;
}

export interface IUpdateServiceDeleteRequest {
	inventory_type: number;
	id_inventory: number;
	reason: string;
	condition: string;
	id_company: number;
	created_by: number;
	id_workflow: number;
}

export interface IServiceDeleteGetAllResponse {
	status: string;
	message: string;
	data: IServiceDeletePaginateResponse | null;
}

export interface IServiceDeleteInterfaceState {
	getAllServiceDeleteWithPagination: IServiceDeletePaginateResponse | null;
	title: string;
}

export type ServiceDeleteContainerState = IServiceDeleteInterfaceState;
