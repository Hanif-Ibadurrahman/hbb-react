import { PaginationState } from "./paginationTypes";
export interface IServiceDisplacement {
	id: number;
	id_quest: string | null;
	date: string | null;
	remark: string | null;
	status: string | null;
	id_inventory: string | null;
	nipg_from: string | null;
	nipg_to: string | null;
	approve_by: string | null;
	approved_date: string | null;
	date_start: string | null;
	date_order: string | null;
	date_end: string | null;
	permintaan_layanan: string | null;
	tindak_lanjut: string | null;
	eksekutor: string | null;
	id_area: string | null;
	id_satker: string | null;
	id_lokasi: string | null;
	reject: string | null;
	description: string | null;
	from_mobile: boolean;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean;
	tipe: string | null;
	id_permintaan: string | null;
	id_approval: string | null;
	from_user: string | null;
	to_user: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_company: string | null;
	from_name: string | null;
	to_name: string | null;
	company_name: string | null;
	inventory_name: string | null;
	location_name: string | null;
}

export interface IServiceDisplacementPaginateResponse extends PaginationState {
	data: IServiceDisplacement[];
}

export interface IServiceDisplacementGetAllParams {
	page?: number;
	per_page?: number;
	date?: string;
}

export interface ICreateServiceDisplacementRequest {
	date: string;
	id_company: string;
	id_inventory: string;
	id_workflow: string;
	from_user: string;
	to_user: string;
	id_lokasi: string;
	tipe?: string;
}

export interface IUpdateServiceDisplacementRequest {
	date: string;
	id_company: string;
	id_inventory: string;
	id_workflow: string;
	from_user: string;
	to_user: string;
	id_lokasi: string;
	tipe?: string;
}

export interface IServiceDisplacementGetAllResponse {
	status: string;
	message: string;
	data: IServiceDisplacementPaginateResponse | null;
}

export interface IServiceDisplacementInterfaceState {
	getAllServiceDisplacementWithPagination: IServiceDisplacementPaginateResponse | null;
	title: string;
}

export type ServiceDisplacementContainerState =
	IServiceDisplacementInterfaceState;
