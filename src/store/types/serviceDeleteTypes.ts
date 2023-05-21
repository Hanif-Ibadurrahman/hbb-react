import { PaginationState } from "./paginationTypes";

export interface IServiceDelete {
	id: number;
	id_quest: string | null;
	nipg: string | null;
	inventory_type: number | null;
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
	from_mobile: boolean | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean | null;
	id_company: number | null;
	created_by: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_approval: number | null;
	transaction_uuid: string | null;
	condition: string | null;
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

export interface IServiceDeletePaginateResponse extends PaginationState {
	data: IServiceDelete[];
}

export interface IServiceDeleteGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	date?: string;
	reason?: string;
	remark?: string;
}

export interface ICreateServiceDeleteRequest {
	inventory_type: number;
	id_inventory: number;
	date: string;
	reason: string;
	condition: string;
	id_company: number;
	created_by: number;
	id_workflow: number;
}

export interface IUpdateServiceDeleteRequest {
	inventory_type: number;
	id_inventory: number;
	date: string;
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
