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
	status: string | null;
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
	from_mobile: boolean;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean | null;
	id_company: string | null;
	created_by: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_approval: string | null;
}

export interface IServiceDeletePaginateResponse extends PaginationState {
	data: IServiceDelete[];
}

export interface IServiceDeleteGetAllParams {
	page?: number;
	per_page?: number;
	date?: string;
	reason?: string;
	remark?: string;
}

export interface ICreateServiceDeleteRequest {
	id_inventory: string;
	date: string;
	reason: string;
	remark: string;
	id_company: string;
	created_by: string;
	id_workflow: string;
}

export interface IUpdateServiceDeleteRequest {
	id_inventory: string;
	date: string;
	reason: string;
	remark: string;
	id_company: string;
	created_by: string;
	id_workflow: string;
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
